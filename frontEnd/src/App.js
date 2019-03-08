import React, { Component } from "react";
import "./App.css";
import Main from "./containers/Main";
import Login from "./containers/Login";
import { Route, Switch } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>

        <main >
          <Switch>
            <Route exact path="/main" component={Main} />,
            <Route exact path="/" component={Login} />

          </Switch>
        </main>
      </div>
    );
  }
}

export default App;