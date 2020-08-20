module.exports = app => {
  const expenses = require("../controllers/expense.controller.js");

  var router = require("express").Router();

  // Create a new Expense
  router.post("/", expenses.create);

  // Retrieve all Expenses
  router.get("/", expenses.findAll);

  // Retrieve all approved Expenses
  router.get("/approved", expenses.findAllApproved);

  // Retrieve a single Expense with id
  router.get("/:id", expenses.findOne);

  // Update a Expense with id
  router.put("/:id", expenses.update);

  // Delete a Expense with id
  router.delete("/:id", expenses.delete);

  // Delete all Expenses
  router.delete("/", expenses.deleteAll);

  app.use('/api/expenses', router);
};