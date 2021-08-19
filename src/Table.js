
import React from "react";
import { useEffect, useState } from "react";
import Row from "./Row";
import { nanoid } from 'nanoid';
const moment = require('moment');

function Table() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        let urls = [];

        fetch(`https://resttest.bench.co/transactions/1.json`)
        .then(firstPage => firstPage.json())
        .then(
            (firstPage) => {
                const totalTransactions = firstPage.totalCount;
                const transactionsInPage = firstPage.transactions.length
                
                let numPagesToGo = Math.ceil(totalTransactions / transactionsInPage);

                let containTransactions = [];
                containTransactions = containTransactions.concat(firstPage.transactions);

                for (let i = 2; i <= numPagesToGo; i++) {
                    urls.push(`https://resttest.bench.co/transactions/${i}.json`);
                }

                const pagesToFetch = urls.map(url => fetch(url).then(page => page.json()));
                Promise.all(pagesToFetch)
                .then(results => {
                            setIsLoaded(true);
                            for (let result of results) {
                                containTransactions = containTransactions.concat(result.transactions);
                            }
                            setTransactions(containTransactions);
                        });
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        ) 
    }, []);

      

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
                            <th className="col-date">Date</th>
                            <th className="col-company">Company</th>
                            <th className="col-account">Account</th>
                            <th className="col-amount">{"$" + totalAmount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!transactions.length ? (
                            <tr><td>No data found</td></tr>
                        ) : (
                            transactions.map((transaction) => (
                                <Row 
                                    key={nanoid()}
                                    date = {moment(transaction.Date).format('MMM Do, YYYY')}
                                    company = {transaction.Company}
                                    ledger = {transaction.Ledger}
                                    amount = {transaction.Amount > 0 ? `\$${transaction.Amount}` : `- \$${Math.abs(transaction.Amount)}`}
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