import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddExpense from "./components/add-expense.component";
import Expense from "./components/expense.component";
import ExpensesList from "./components/expenses-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/expenses" className="navbar-brand">
              jtExpenses
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/expenses"} className="nav-link">
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/expenses"]} component={ExpensesList} />
              <Route exact path="/add" component={AddExpense} />
              <Route path="/expenses/:id" component={Expense} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;