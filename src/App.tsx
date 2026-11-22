import { useState } from "react";
import "./App.css";
import BalanceCard from "./components/BalanceCard";

function App() {
  const [balance, setBalance] = useState(125000);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

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

      <button className="btn btn-primary"
        onClick={() => {
          setBalance((prevBalance) => prevBalance + 1000);
          setMessage("Баланс успешно пополнен на 1000 ₽");
          setMessageType("success");
          
        }}
      >
        Пополнить баланс на 1000 ₽
      </button>

      {message && (<p className={`notification ${messageType}`}>{message}</p>)}

      <button className="btn btn-secondary"
        disabled={balance < 1000}
        onClick={() => {
          if (balance >= 1000) {
            setBalance(balance - 1000);
            setMessage("С баланса списано 1000 ₽");
            setMessageType("expense");
          } else {
            alert("Недостаточно средств!");
          }
        }}
      >
        Списать 1000 ₽
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
