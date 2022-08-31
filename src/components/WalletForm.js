import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExpense } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies, expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="walletFormContainer">
        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            id="valueInput"
            type="number"
            value={ value }
            onChange={ ({ target }) => this.setState({ value: target.value }) }
          />
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            data-testid="description-input"
            id="descriptionInput"
            value={ description }
            onChange={ ({ target }) => this.setState({ description: target.value }) }
          />
        </label>
        <label htmlFor="currencyInput">
          Moeda:
          <select
            data-testid="currency-input"
            id="currencyInput"
            value={ currency }
            onChange={ ({ target }) => this.setState({ currency: target.value }) }
          >
            {Object.values(currencies).map((currencyAbb) => (
              <option key={ currencyAbb }>{currencyAbb}</option>
            ))}
          </select>
        </label>
        <label htmlFor="methodInput">
          Metodo do pagamento:
          <select
            data-testid="method-input"
            id="methodInput"
            value={ method }
            onChange={ ({ target }) => this.setState({ method: target.value }) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria:
          <select
            data-testid="tag-input"
            id="tagInput"
            value={ tag }
            onChange={ ({ target }) => this.setState({ tag: target.value }) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => {
            const id = expenses.length;
            const newExpense = {
              id,
              value,
              description,
              currency,
              method,
              tag,
            };
            dispatch(fetchExpense(newExpense, expenses));
            this.setState({ value: '', description: '' });
          } }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
