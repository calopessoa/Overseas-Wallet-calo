import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { loginUser } from '../actions';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisable: true,
    };
  }

  onSubmitForm = () => {
    const { userLogin, history } = this.props;
    const { email } = this.state;
    userLogin(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate= () => {
    const MIN_LENGHT_VALUE = 6;
    const { email, password } = this.state;
    const minLength = password.length >= MIN_LENGHT_VALUE;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);

    const isValid = minLength && mailValidator;
    if (isValid) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  }

  render() {
    const { email, password, btnDisable } = this.state;
    return (
      <div>
        <main className="header">
          <h2>Overseas Wallet</h2>
          <h3>Seu companheiro para despesas no exterior</h3>
        </main>
        <form className="login">
          <input
            data-testid="email-input"
            className="form-text email-input"
            label="Email: "
            type="text"
            onChange={ this.handleChange }
            value={ email }
            name="email"
            placeholder="your email"
          />
          <input
            data-testid="password-input"
            className="form-text password"
            label="Senha: "
            type="password"
            onChange={ this.handleChange }
            value={ password }
            name="password"
            placeholder="insert your password"
          />
          <button
            type="button"
            label="Enviar"
            className="login-btn"
            disabled={ btnDisable }
            onClick={ this.onSubmitForm }
          >
            Entrar
          </button>
        </form>
        <footer>
          Developed by:
          {' '}
          Carlos Augusto
          {' '}
          <a
            href="https://www.linkedin.com/in/carlos-augusto-lopes-de-oliveira-2602458b/"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/calopessoa"
          >
            <FaGithub />
          </a>
        </footer>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(loginUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
