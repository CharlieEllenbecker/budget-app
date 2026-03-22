import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    let [monthlyBudgets, setMonthlyBudgets] = useState([]);

    const fetchMonthlyBudgets = async () => {
        await axios
            .get('/api/monthly-budgets')
            .then(response => {
                setMonthlyBudgets(response.data);
            })
            .catch(error => {
                console.error('Error fetching monthly budgets:', error);
            });
    }

    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <h2>Monthly Budgets:</h2>
            <button onClick={() => {
                fetchMonthlyBudgets();
            }}>Display monthly budggets</button>
            {console.log(monthlyBudgets)}
            {monthlyBudgets.length > 0 ? (
                monthlyBudgets.map((budget, index) => (
                    <div key={index}>
                        <p>Month: {budget.month}</p>
                    </div>
                ))
            ) : (
                <p>No monthly budgets.</p>
            )}
        </div>
    );
}

export default Home;