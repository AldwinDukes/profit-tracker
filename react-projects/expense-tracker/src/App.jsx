import { useState } from "react";
import Balance from "./components/Balance";
import Form from "./components/Form";
import DeductionBtn from "./components/DeductionBtn";

import { CgProfile } from "react-icons/cg";

export default function App() {
  const [activeBtn, setActiveBtn] = useState("Income");
  const [newAmount, setNewAmount] = useState("");
  const [activeCategory, setActiveCategory] = useState("Salary");
  const [salary, setSalary] = useState(0);
  const [bussines, setBussines] = useState(0);
  const [extra, setExtra] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const source = ["Salary", "Bussines", "Remittance"];
  const global = salary + bussines + extra - expenses;

  function IncomeBtn() {
    setActiveBtn("Income");
    setActiveCategory("Salary"); // Reset to a valid income source
  }

  function ExpensesBtn() {
    setActiveBtn("Expense");
    setActiveCategory("Food"); // Reset to a valid expense category
  }

  function handleChange(e) {
    const val = e.target.value;
    setNewAmount(val === "" ? "" : Number(val));
  }

  function deductExpenses() {
    if (newAmount == "" || global <= 0) return;

    setExpenses(expenses + newAmount);
  }

  function addBtn() {
    if (newAmount === "" || newAmount == 0) return;

    switch (activeCategory) {
      case "Salary":
        setSalary(salary + newAmount);
        break;
      case "Bussines":
        setBussines(bussines + newAmount);
        break;
      case "Remittance":
        setExtra(extra + newAmount);
    }
    setNewAmount("");
  }

  return (
    <div className="h-screen p-2">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Expense Tracker</h1>
        <CgProfile className="size-8" />
      </header>

      <main className="border rounded-md p-4">
        <section className="mb-4 flex justify-between">
          <Balance income="Global" amount={global || 0} />
          <p className="text-amber-500">View transactions</p>
        </section>

        <section className="flex justify-between mb-10">
          <Balance income="Salary" amount={salary || 0} />
          <Balance income="Bussines" amount={bussines || 0} />
          <Balance income="Extra Income" amount={extra || 0} />
        </section>

        <section className="mb-10">
          <h4 className="text-center mb-4">Create Transaction</h4>
          <div className="flex justify-around">
            <button
              onClick={IncomeBtn}
              className="px-8 py-2 rounded-md font-semibold text-white bg-emerald-700 hover:bg-emerald-500 cursor-pointer"
            >
              Income
            </button>
            <button
              onClick={ExpensesBtn}
              className="px-8 py-2 rounded-md font-semibold text-white bg-amber-700 hover:bg-amber-500 cursor-pointer"
            >
              Expenses
            </button>
          </div>
        </section>

        <section>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="mb-8 flex justify-around">
              <input
                className="border rounded-sm"
                placeholder="Amount"
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                value={newAmount}
                onChange={handleChange}
              ></input>

              {activeBtn === "Income" ? (
                <Form
                  options={source}
                  value={activeCategory}
                  btnFunction={addBtn}
                  onChange={(e) => setActiveCategory(e.target.value)}
                />
              ) : (
                <DeductionBtn btnFunction={deductExpenses} />
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
