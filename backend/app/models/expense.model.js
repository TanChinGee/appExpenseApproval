module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    item: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.STRING
    },
    approved: {
      type: Sequelize.BOOLEAN
    }
  });

  return Expense;
};