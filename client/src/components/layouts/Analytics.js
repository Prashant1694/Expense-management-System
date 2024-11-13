import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  //category
  const categories = [
    "Salary",
    "Trading",
    "Investment",
    "Movie",
    "Bills",
    "Medical",
    "Fees",
    "Food",
    "Other",
  ];

  //total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.Type === "Income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.Type === "Expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercentage =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnOver = allTransaction.reduce(
    (acc, transaction) => acc + transaction.Amount,
    0
  );
  const totalIncomeTurnOver = allTransaction
    .filter((transaction) => transaction.Type === "Income")
    .reduce((acc, transaction) => acc + transaction.Amount, 0);

  const totalExpenseTurnOver = allTransaction
    .filter((transaction) => transaction.Type === "Expense")
    .reduce((acc, transaction) => acc + transaction.Amount, 0);

  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercentage =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5>Income : {totalIncomeTransactions.length}</h5>
              <h5>Expense : {totalExpenseTransactions.length}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Turnover : {totalTurnOver}</div>
            <div className="card-body">
              <h5>Income : {totalIncomeTurnOver}</h5>
              <h5>Expense : {totalExpenseTurnOver}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnOverPercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnOverPercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col md-4">
          <h4>Category Wise Income</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.Type === "Income" &&
                  transaction.Category === category
              )
              .reduce((acc, transaction) => acc + transaction.Amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col md-4">
          <h4>Categorywise Expense</h4>
          {categories.map((category) => {
            const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.Type === "Expense" &&
                  transaction.Category === category
              )
              .reduce((acc, transaction) => acc + transaction.Amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;
