const db = require("../models");
const Expense = db.expenses;
const Op = db.Sequelize.Op;

// Create and Save a new Expense
exports.create = (req, res) => {
  
};

// Retrieve all Expenses from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Expense with an id
exports.findOne = (req, res) => {
  
};

// Update a Expense by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Expense with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Expenses from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all approved Expenses
exports.findAllApproved = (req, res) => {
  
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.item) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Expense
  const expense = {
    item: req.body.item,
    amount: req.body.amount,
    approved: req.body.approved ? req.body.approved : false
  };

  // Save Expense in the database
  Expense.create(expense)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expense."
      });
    });
};

exports.findAll = (req, res) => {
  const item = req.query.item;
  var condition = item ? { item: { [Op.like]: `%${item}%` } } : null;

  Expense.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Expense.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Expense with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Expense was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Expense with id=${id}. Maybe Expense was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Expense with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Expense.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Expense was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Expense with id=${id}. Maybe Expense was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Expense with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Expense.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Expenses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all expenses."
      });
    });
};

exports.findAllApproved = (req, res) => {
  Expense.findAll({ where: { approved: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving expenses."
      });
    });
};