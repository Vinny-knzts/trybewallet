import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      total: 0.00.toFixed(2),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let total = 0;
    const { expenses } = this.props;
    expenses.forEach((expense) => {
      total += (parseFloat(expense.value) * expense.exchangeRates[expense.currency].ask);
    });
    total = total.toFixed(2);
    if (prevState.total !== total) { this.setState({ total }); }
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div className="headerContainer">
        <p className="headerTitle">TrybeWallet</p>
        <div className="headerInfoContainer">
          <div className="headerInfo">
            <p>Email:</p>
            <p data-testid="email-field" className="headerText">{email}</p>
          </div>
          <div className="headerInfo">
            <p className="headerText">Dispesa Total:</p>
            <p data-testid="total-field">{ total }</p>
            <p data-testid="header-currency-field" className="headerText">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Header);
