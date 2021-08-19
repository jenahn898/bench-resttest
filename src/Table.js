
import React from "react";
import { useEffect, useState } from "react";
import Row from "./Row";
import { nanoid } from 'nanoid'

function Table() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        var urls = [
            `https://resttest.bench.co/transactions/1.json`, 
            `https://resttest.bench.co/transactions/2.json`,
            `https://resttest.bench.co/transactions/3.json`,
            `https://resttest.bench.co/transactions/4.json`,
            ];
        var promises = urls.map(url => fetch(url).then(res => res.json()));
            Promise.all(promises)
            .then(results => {
                setIsLoaded(true);
                var dataArray = [];
                for (let result of results) {
                    dataArray = dataArray.concat(result.transactions);
                }
                setTransactions(dataArray);

            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }); 
    }, [])

    if(error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (transactions.length > 0) {

            let totalAmount = transactions.map((transaction) => Number(transaction.Amount))
                                .reduce((total, amount) => total + amount)
                                .toFixed(2);

            return (
                <table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Company</td>
                            <td>Account</td>
                            <td>{"$" + totalAmount}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {!transactions.length ? (
                            <tr><td>No data found</td></tr>
                        ) : (
                            transactions.map((transaction) => (
                                <Row 
                                    key={nanoid()}
                                    date = {transaction.Date}
                                    company = {transaction.Company}
                                    ledger = {transaction.Ledger}
                                    amount = {transaction.Amount}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            );
        }
        return (
            <div>No data found</div>
        );
        
    }
}

export default Table;



