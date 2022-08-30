import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
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
            <p data-testid="total-field">0</p>
            <p data-testid="header-currency-field" className="headerText">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
