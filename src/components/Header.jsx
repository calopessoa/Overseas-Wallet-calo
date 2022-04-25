import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends React.Component {
  calculateExpense = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, cur) => (
      cur.value * cur.exchangeRates[cur.currency].ask + acc
    ), 0);
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    const { calculateExpense } = this;
    return (
      <main className="header">
        <Link to="/">Overseas Wallet</Link>
        <div data-testid="email-field">
          <span className="email-header">
            Email:
            {' '}
            { email }
          </span>
          <p data-testid="header-currency-field" className="total-header">
            Total: BRL
            {' '}
            <span data-testid="total-field">

              { calculateExpense() }
            </span>
          </p>
        </div>
      </main>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  exchangeRates: state.exchangeRates,
});

export default connect(mapStateToProps, null)(Header);
