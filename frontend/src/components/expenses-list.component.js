import React, { Component } from "react";
import ExpenseDataService from "../services/expense.service";
import { Link } from "react-router-dom";

export default class ExpensesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
    this.retrieveExpenses = this.retrieveExpenses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveExpense = this.setActiveExpense.bind(this);
    this.removeAllExpenses = this.removeAllExpenses.bind(this);
    this.searchItem = this.searchItem.bind(this);

    this.state = {
      expenses: [],
      currentExpense: null,
      currentIndex: -1,
      searchItem: ""
    };
  }

  componentDidMount() {
    this.retrieveExpenses();
  }

  onChangeSearchItem(e) {
    const searchItem = e.target.value;

    this.setState({
      searchItem: searchItem
    });
  }

  retrieveExpenses() {
    ExpenseDataService.getAll()
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveExpenses();
    this.setState({
      currentExpense: null,
      currentIndex: -1
    });
  }

  setActiveExpense(expense, index) {
    this.setState({
      currentExpense: expense,
      currentIndex: index
    });
  }

  removeAllExpenses() {
    ExpenseDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchItem() {
    ExpenseDataService.findByItem(this.state.searchItem)
      .then(response => {
        this.setState({
          expenses: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchItem, expenses, currentExpense, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by item"
              value={searchItem}
              onChange={this.onChangeSearchItem}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchItem}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Expenses List</h4>

          <ul className="list-group">
            {expenses &&
              expenses.map((expense, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveExpense(expense, index)}
                  key={index}
                >
                  {expense.item}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllExpenses}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentExpense ? (
            <div>
              <h4>Expense</h4>
              <div>
                <label>
                  <strong>Item:</strong>
                </label>{" "}
                {currentExpense.item}
              </div>
              <div>
                <label>
                  <strong>Amount(SGD):</strong>
                </label>{" "}
                {currentExpense.amount}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentExpense.approved ? "Approved" : "Uncleared"}
              </div>

              <Link
                to={"/expenses/" + currentExpense.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Expense...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}