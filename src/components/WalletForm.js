import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <div>
          <p>Valor:</p>
          <p data-testid="value-input">0</p>
        </div>
        <div>
          <p>Descrição:</p>
          <p data-testid="description-input">Sobre</p>
        </div>
        <div>
          <p>Moeda:</p>
          <select data-testid="currency-input">
            {Object.values(currencies).map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </div>
        <div>
          <p>Metodo do pagamento:</p>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <p>Categoria:</p>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
