import React from "react";
import { withStateHandlers, withHandlers, compose } from "recompose";

const LoginForm = ({ onSubmit, userName, password, onChange, ...rest }) => {
  return (
    <form onSubmit={onSubmit}>
      <input type="name" name="userName" value={userName} onChange={onChange} />
      <br />
      <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <br />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

const mapPropsToState = ({ initialUserName = "", initialPassword = "" }) => ({
  values: {
    userName: initialUserName,
    password: initialPassword
  }
});

const mapHandlersToState = {
  onChange: ({ values }) => ({ target: { name, value } }) => ({
    values: { ...values, [name]: value }
  })
};

const mapHandlers = {
  onSubmit: ({ handleOnSubmit, values }) => event => {
    event.preventDefault();
    handleOnSubmit(values);
  }
};

export default compose(
  withStateHandlers(mapPropsToState, mapHandlersToState),
  withHandlers(mapHandlers)
)(LoginForm);
