import React from "react";
import { render } from "react-dom";

const App = () => {
    return (
        <div id="content-container">
            <div id="header-bar">
                <h1 id="main-title">Bench Test</h1>
            </div>
            <div className="main">
                Stuff here
            </div>
        </div>
    );
}

render(<App />, document.getElementById("root"));