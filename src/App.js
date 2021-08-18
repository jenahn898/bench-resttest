import React from "react";
import { render } from "react-dom";
import Entry from './Entry';

const App = () => {
    return (
        <div id="content-container">
            <div id="header-bar">
                <h1 id="main-title">Bench Test</h1>
            </div>
            <div className="main">
                <div id="table-container">
                        <Entry />
                </div>
            </div>
        </div>
    );
}

render(<App />, document.getElementById("root"));