import React, { Component } from "react";
import ExpenseDataService from "../services/expense.service";

export default class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.newExpense = this.newExpense.bind(this);

    this.state = {
      id: null,
      item: "",
      amount: "", 
      approved: false,

      submitted: false
    };
  }

  onChangeItem(e) {
    this.setState({
      item: e.target.value
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  saveExpense() {
    var data = {
      item: this.state.item,
      amount: this.state.amount
    };

    ExpenseDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          item: response.data.item,
          amount: response.data.amount,
          approved: response.data.approved,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newExpense() {
    this.setState({
      id: null,
      item: "",
      amount: "",
      approved: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newExpense}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="item">Item</label>
              <input
                type="text"
                className="form-control"
                id="item"
                required
                value={this.state.item}
                onChange={this.onChangeItem}
                name="item"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount(SGD)</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                required
                value={this.state.amount}
                onChange={this.onChangeAmount}
                name="amount"
              />
            </div>

            <button onClick={this.saveExpense} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}