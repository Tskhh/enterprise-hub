import { useState, useEffect } from "react";
import "./App.css";
import BalanceCard from "./components/BalanceCard";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
};


function isValidTransaction(transaction: unknown): transaction is Transaction {
  if (
    typeof transaction !== "object" || 
    transaction === null
  ) {
    return false;
  }


return (
  "id" in transaction && 
  typeof transaction.id === "string" && 
  "type" in transaction &&
  (transaction.type === "income" ||
    transaction.type === "expense") && 
    "amount" in transaction &&
    typeof transaction.amount === "number" &&
    Number.isSafeInteger(transaction.amount) &&
    transaction.amount > 0
);
}

function App() {
  const [balance, setBalance] = useState(() => {
    try{
    const savedBalance = localStorage.getItem("balance");

    if (savedBalance === null) {
      return 125000;
    }

    const parsedBalance = Number(savedBalance);

    if (
      savedBalance.trim() !== "" &&
      Number.isSafeInteger(parsedBalance) &&
      parsedBalance >= 0
    ) {
      return parsedBalance
    }

    return 125000;
  } catch {
    return 125000;
  }

  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const savedTransactions = localStorage.getItem("transactions");

      if (savedTransactions === null) {
        return [];
      }

      const parsedTransactions = JSON.parse(savedTransactions);

      if (Array.isArray(parsedTransactions) && parsedTransactions.every(isValidTransaction)) {
        return parsedTransactions;
      }

      return [];
    } catch {
      return [];
    }
  });
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    try {
      localStorage.setItem("balance", String(balance))
    } catch (error) {
      console.error("Ошибка сохранения баланса:", error)
    }
    
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const numericAmount = Number(amount);

  const isValidAmount =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount > 0 &&
    Number.isSafeInteger(numericAmount);

  const cards = [
    { title: "Баланс", amount: balance },
    { title: "Доходы", amount: 80000 },
    { title: "Расходы", amount: 35000 },
    { title: "Прибыль", amount: 45000 },
    { title: "Инвестиции", amount: 200000 },
  ];

  return (
    <div className="container">
      <h1>Enterprise Hub</h1>
      <p>Моя первая корпоративная платформа</p>
      <p>Здесь будут финансы, аналитика и AI</p>
      <h2 className="section-title">Управление балансом</h2>
      <label htmlFor="amount" className="amount-label">
        Сумма операции, ₽
      </label>
      <input
        id="amount"
        type="number"
        placeholder="Введите сумму"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="btn btn-primary"
        disabled={!isValidAmount}
        onClick={() => {
          setBalance((prevBalance) => prevBalance + Number(amount));

          const id = crypto.randomUUID();
          setTransactions((prevTransaction) => [
            {
              id: id,
              type: "income",
              amount: numericAmount,
            },
            ...prevTransaction,
          ]);
          setMessage(`Баланс успешно пополнен на ${amount} ₽`);
          setMessageType("success");
        }}
      >
        Пополнить баланс
      </button>

      {message && <p className={`notification ${messageType}`}>{message}</p>}

      <button
        className="btn btn-secondary"
        disabled={!isValidAmount || numericAmount > balance}
        onClick={() => {
          const sum = Number(amount);

          if (sum > 0 && Number.isFinite(sum) && sum <= balance) {
            setBalance((prevBalance) => prevBalance - sum);

            const id = crypto.randomUUID();
            setTransactions((prevTransaction) => [
              {
                id: id,
                type: "expense",
                amount: sum,
              },
              ...prevTransaction,
            ]);
            setMessage(`С баланса списано ${amount} ₽`);
            setMessageType("expense");
          }
        }}
      >
        Списать
      </button>

      <div className="cards-grid">
        {cards.map((card) => (
          <BalanceCard
            key={card.title}
            title={card.title}
            amount={card.amount}
          />
        ))}
      </div>

      <section className="transaction-history">
        <h2>История операций</h2>

        {transactions.length === 0 && (
          <p className="empty-history">Пока нет финансовых операций</p>
        )}

        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div className="transaction-item" key={transaction.id}>
              <span>{isIncome ? "Пополнение" : "Списание"}</span>
              <span className={isIncome ? "positive" : "negative"}>
                {isIncome ? "+" : "-"}
                {transaction.amount.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
