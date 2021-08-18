import React from "react";
import { render } from "react-dom";

const App = () => {
    return (
        <div id="content-container">
            <div id="header-bar">
                <h1 id="main-title">Bench Test</h1>
            </div>
            <div className="main">
                <div id="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Company</th>
                                <th>Account</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            Stuff goes here
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

render(<App />, document.getElementById("root"));