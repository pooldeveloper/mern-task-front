import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tokenAuth from "./config/tokenAuth";
import RoutePrivate from "./components/routes/RoutePrivate";
import AlertState from "./context/alerts/AlertState";
import LoginState from "./context/login/LoginState";
import ProjectState from "./context/projects/ProjectState";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import TaskState from "./context/tasks/TaskState";

const token = localStorage.getItem('token')
if(token){
  tokenAuth(token)
}

function App() {
  return (
    <LoginState>
      <AlertState>
        <ProjectState>
          <TaskState>
            <Router>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/nueva-cuenta" component={NewAccount} />
                <RoutePrivate exact path="/" component={Projects} />
              </Switch>
            </Router>
          </TaskState>
        </ProjectState>
      </AlertState>
    </LoginState>
  );
}

export default App;
