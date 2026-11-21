
import './App.css'
import BalanceCard from './components/BalanceCard';

function App() {

  const cards = [
    { title: "Баланс", amount: 125000},
    { title: "Доходы", amount: 80000},
    { title: "Расходы", amount: 35000},
    { title: "Прибыль", amount: 45000},
    { title: "Инвестиции", amount: 200000}
  ]



  return (
    <div className="container">
      <h1>Enterprise Hub</h1>
      <p>Моя первая корпоративная рплатформа</p>
      <p>Здесь будут финансы, аналитика и AI</p>

      {cards.map((card) => (
        <BalanceCard
        key={card.title}
        title={card.title}
        amount={card.amount}
        />
      ))}
    </div>

    

  );
}

export default App;
