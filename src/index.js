import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./LoginForm";
import "./styles.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const Home = () => <div>Welcome, user!</div>;
const Login = props => {
  console.log(props);
  return <LoginForm handleOnSubmit={values => props.history.replace("/")} />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

const app = (state = { data: [], loading: false }, action) => {
  switch (action.type) {
    case "API_CALL_START":
      return { ...state, loading: true };
    case "API_CALL_SUCCESS":
      return { ...state, data: action.payload.data, loading: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ app });
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
