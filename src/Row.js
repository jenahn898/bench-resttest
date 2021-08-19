import React from "react";

const Row = ({
    date,
    company,
    ledger,
    amount
}) => {
    return (
        <tr>
            <td>{date}</td>
            <td className="cell-company">{company}</td>
            <td>{ledger}</td>
            <td className="cell-amount">{amount}</td>
        </tr>
    )
}

export default Row;
    