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
            <td>{company}</td>
            <td>{ledger}</td>
            <td>{amount}</td>
        </tr>
    )
}

export default Row;
    