import React from 'react';
import './Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailValue: '',
      passwordValue: '',
    };
  }

  render() {
    const { emailValue, passwordValue } = this.state;
    const { dispatch, history } = this.props;
    const minPassword = 6;
    return (
      <div className="loginContainer">
        <p className="loginText">Login</p>
        <input
          data-testid="email-input"
          className="loginInput"
          type="email"
          placeholder="Usuário"
          value={ emailValue }
          onChange={ ({ target }) => this.setState({ emailValue: target.value }) }
        />
        <input
          data-testid="password-input"
          className="loginInput"
          type="password"
          placeholder="Senha"
          value={ passwordValue }
          onChange={ ({ target }) => this.setState({ passwordValue: target.value }) }
        />
        <button
          className="loginButton"
          id="login-btn"
          name="login-btn"
          type="button"
          disabled={ passwordValue.length < minPassword + !emailValue.match(/.+@.+\.com$/) }
          onClick={ () => {
            dispatch(loginAction(emailValue));
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
