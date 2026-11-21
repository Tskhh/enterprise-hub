function BalanceCard({ title, amount }: { title: string, amount: number }) {
    return (
        <div className="balance-card">
            <h2>{title}</h2>
            <p>{amount.toLocaleString('ru-RU')} ₽</p>
        </div>
    )
}

export default BalanceCard