import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const BudgetApp = () => {
  const navigate = useNavigate();
  const [budgetAmount, setBudgetAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [budgetArray, setBudgetArray] = useState(
    JSON.parse(localStorage.getItem("allBudgets"))
  );
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [updateExpenseName, setUpdateExpenseName] = useState("");
  const [updateExpenseAmount, setUpdateExpenseAmount] = useState("");
  useEffect(() => {
      if (budgetArray) {
      // setBudgetArray(expenses);
      //  console.log([...budgetArray,expenses]);
      const totalExpenseAmount = budgetArray.reduce(
        (accumulator, currentItem) => {
          return accumulator + Number(currentItem.expenseAmount);
        },
        0
      );

      setTotalExpense(totalExpenseAmount);
    }
  });

  useEffect(() => {
    if (localStorage["budgetAmount"]) {
      setTotalBudget(Number(localStorage["budgetAmount"]));
      setBalance(Number(localStorage["budgetAmount"]) - totalExpense);
    }
  });

  const setBudget = (e) => {
    localStorage.setItem("budgetAmount", budgetAmount);
    toast.success("Budget Amount Saved!");
    setBudgetAmount("");
  };

  const submitBudget = () => {
    if (!localStorage["budgetAmount"]) {
      toast.info("Enter Budget Amount!");
    } else {
      const allBudgets = {
        expenseName,
        expenseAmount,
      };

      setBudgetArray([...budgetArray, allBudgets]);
      // console.log(budgetArray);
      localStorage.setItem(
        "allBudgets",
        JSON.stringify([...budgetArray, allBudgets])
      );
      // console.log(totalExpense);
      setExpenseName("");
      setExpenseAmount("");
    }
  };

  const deleteBtn = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Expense deleted successfully!",
          icon: "success"
        });
        let updatedBudgetArray = [...budgetArray];
        updatedBudgetArray.splice(index, 1);
        setBudgetArray(updatedBudgetArray);
        // console.log(updatedBudgetArray);
        localStorage.setItem("allBudgets", JSON.stringify(updatedBudgetArray));
      }
    });
};

const editBtn = (index) => {
    navigate(`/${index}`);
    let newBudgetArray = [...budgetArray];
    for (let id = 0; id < newBudgetArray.length; id++) {
        setUpdateExpenseName(newBudgetArray[index].expenseName)
        setUpdateExpenseAmount(newBudgetArray[index].expenseAmount)
    }
};
let {id}=useParams()
const updateExpense = () => {
    let updatedBudgetArray = [...budgetArray];
    updatedBudgetArray.splice(id, 1,{expenseName:updateExpenseName, expenseAmount:updateExpenseAmount});
    setBudgetArray(updatedBudgetArray);
    localStorage.setItem("allBudgets", JSON.stringify(updatedBudgetArray));
     toast.success('Updated successfully!!')
  };
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4 text-uppercase fw-bold">Budgeting App</h1>
        <div className="d-md-flex gap-3">
          <div className="col-md-6 p-3 bg">
            <div>
              <div className="form-group mb-2">
                <h3 htmlFor="incomeAmount">Budget Amount</h3>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="Enter Estimated Amount"
                  required
                />
              </div>
             <div className="text-end">
             <button
                type="submit"
                className="btn btn-primary text-end mt-3 text-uppercase"
                onClick={() => setBudget()}
                disabled={!budgetAmount}
              >
                Set Budget
              </button>
             </div>
            </div>
          </div>
          {/* Expense Section */}
          <div className="col-md-6 p-3 mt-3 mt-md-0 bg">
            <div>
              <div className="form-group mb-2">
                <label htmlFor="expenseName">Expense Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="expenseName"
                  name="expenseName"
                  placeholder="E.g., Rent"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="expenseAmount">Expense Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="expenseAmount"
                  name="expenseAmount"
                  placeholder="Enter expense amount"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  required
                />
              </div>
             <div className="text-end">
             <button
                type="submit"
                className="btn btn-primary"
                onClick={() => submitBudget()}
                disabled={!expenseName || !expenseAmount}
              >
                Check Amount
              </button>
             </div>
            </div>
          </div>
        </div>
      </div>

      {budgetArray.length > 0 && (
        <section className="container m-auto mt-3">
          <div className="output-container flex-space">
            <div>
              <p>Estimated Amount</p>
              <span id="amount">{totalBudget.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
            </div>
            <div>
              <p>Expenses</p>
              <span id="expenditure-value">{totalExpense.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
            </div>
            <div>
              <p>Balance</p>
              <span id="balance-amount">{balance.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
            </div>
          </div>

          {/* Expense List */}
          <div className="">
            <h5>Expense List</h5>
            <div className="" >
              <table className="table bg p-5">
                <thead>
                  <tr>
                    <th scope="col">Expense Name</th>
                    <th scope="col">Expense Amount</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {budgetArray.map((item, index) => (
                    <tr key={index}>
                      <td><i className="fa-solid fa-arrow-right"></i> {item.expenseName}</td>
                      <td>{item.expenseAmount}</td>
                      <td className="">
                        <span className="d-flex gap-3">
                        <i
                          className="fa-regular fa-pen-to-square text-warning"
                          style={{ cursor: "pointer" }}
                          onClick={() => editBtn(index)}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        ></i>
                        <i
                          className="fa-regular fa-trash-can text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteBtn(index)}
                        ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Edit Modal */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit expense
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="form-group mb-2">
                  <label htmlFor="updateExpenseName">Expense Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="updateExpenseName"
                    name="updateExpenseName"
                    placeholder="E.g., Rent"
                    value={updateExpenseName}
                    onChange={(e) => setUpdateExpenseName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="updateExpenseAmount">Expense Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="updateExpenseAmount"
                    name="updateExpenseAmount"
                    placeholder="Enter expense amount"
                    value={updateExpenseAmount}
                    onChange={(e) => setUpdateExpenseAmount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary closeBtn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary "
                disabled={!updateExpenseName || !updateExpenseAmount}
                onClick={()=>updateExpense()}
                
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetApp;
