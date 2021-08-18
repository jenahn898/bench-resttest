
import React from "react";
import { useEffect, useState } from "react";
import { render } from "react-dom";

function Entry() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({});

    
    useEffect(() => {
        fetch(`https://resttest.bench.co/transactions/1.json`)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("passed fetch");
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        ) 
    }, [])

    if(error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(items);
        if (items.transactions)
        {
            console.log(items.transactions);
            console.log(items.transactions[0].Date);
            return(
                <table>
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Company</td>
                            <td>Account</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{items.transactions[0].Date}</td>
                            <td>{items.transactions[0].Company}</td>
                            <td>{items.transactions[0].Ledger}</td>
                            <td>{items.transactions[0].Amount}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        return (
            <div>Data Empty</div>
        );
  
    }
}

export default Entry;



