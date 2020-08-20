import React, { Component } from "react";
import ExpenseDataService from "../services/expense.service";

export default class Expense extends Component {
  constructor(props) {
    super(props);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.updateApproved = this.updateApproved.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);

    this.state = {
      currentExpense: {
        id: null,
        item: "",
        amount: "",
        approved: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getExpense(this.props.match.params.id);
  }

  onChangeItem(e) {
    const item = e.target.value;

    this.setState(function(prevState) {
      return {
        currentExpense: {
          ...prevState.currentExpense,
          item: item
        }
      };
    });
  }

  onChangeAmount(e) {
    const amount = e.target.value;
    
    this.setState(prevState => ({
      currentExpense: {
        ...prevState.currentExpense,
        amount: amount
      }
    }));
  }

  getExpense(id) {
    ExpenseDataService.get(id)
      .then(response => {
        this.setState({
          currentExpense: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateApproved(status) {
    var data = {
      id: this.state.currentExpense.id,
      item: this.state.currentExpense.item,
      amount: this.state.currentExpense.amount,
      approved: status
    };

    ExpenseDataService.update(this.state.currentExpense.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentExpense: {
            ...prevState.currentExpense,
            approved: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateExpense() {
    ExpenseDataService.update(
      this.state.currentExpense.id,
      this.state.currentExpense
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The expense was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteExpense() {    
    ExpenseDataService.delete(this.state.currentExpense.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/expenses')
      })
      .catch(e => {
        console.log(e);
      });
  }

    render() {
        const { currentExpense } = this.state;
    
        return (
          <div>
            {currentExpense ? (
              <div className="edit-form">
                <h4>Expense</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="item">Item</label>
                    <input
                      type="text"
                      className="form-control"
                      id="item"
                      value={currentExpense.item}
                      onChange={this.onChangeItem}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount">Amount(SGD)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="amount"
                      value={currentExpense.amount}
                      onChange={this.onChangeAmount}
                    />
                  </div>
    
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentExpense.approved ? "Approved" : "Uncleared"}
                  </div>
                </form>
    
                {currentExpense.approved ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updateApproved(false)}
                  >
                    Uncleared
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updateApproved(true)}
                  >
                    Approved
                  </button>
                )}
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteExpense}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateExpense}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on an Expense...</p>
              </div>
            )}
          </div>
        );
    }
}