import React from "react";
import ReactDOM from "react-dom";
import GithubSimpleSearch from "./github_simple_search";

const App = () => <GithubSimpleSearch />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
