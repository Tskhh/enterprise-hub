import { useState } from "react";
import "./App.css";
import BalanceCard from "./components/BalanceCard";

function App() {
  const [balance, setBalance] = useState(125000);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const numericAmount = Number(amount);

  const isValidAmount = 
  amount.trim() !== "" && 
  Number.isFinite(numericAmount) && numericAmount > 0;

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
      <label htmlFor="amount" className="amount-label">Сумма операции, ₽</label>
      <input id="amount" type="number" placeholder="Введите сумму" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <button className="btn btn-primary"
        disabled={!isValidAmount}

        onClick={() => {
          setBalance((prevBalance) => prevBalance + Number(amount));
          setMessage(`Баланс успешно пополнен на ${amount} ₽`);
          setMessageType("success");
          
        }}
      >
        Пополнить баланс  
      </button>

      {message && (<p className={`notification ${messageType}`}>{message}</p>)}

      <button className="btn btn-secondary"
        disabled={!isValidAmount || numericAmount > balance}
        onClick={() => {
          const sum = Number(amount);

          if (sum > 0 && Number.isFinite(sum) && sum <= balance) {
            setBalance((prevBalance) => prevBalance - sum);
            setMessage(`С баланса списано ${amount} ₽`);
            setMessageType("expense");
          } 
        }}
      >
        Списать
      </button>

      <div className="cards-grid">
        {cards.map((card) => (
        <BalanceCard key={card.title} title={card.title} amount={card.amount} />
      ))} 
      </div>
    </div>
  );
}



export default App;
