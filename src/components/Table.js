import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, editExpense } from '../redux/actions';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table className="tableConteiner">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{(parseFloat(expense.value)).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {(parseFloat(expense.exchangeRates[expense
                  .currency].ask)).toFixed(2)}
              </td>
              <td>
                {(parseFloat(expense.value) * expense
                  .exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => {
                    const walletForm = document.getElementById('walletForm');
                    const addButton = walletForm.childNodes[5];
                    walletForm.childNodes[5].remove();
                    const editButton = document.createElement('button');
                    editButton.innerHTML = 'Editar despesa';
                    editButton.onclick = function editButtonOnClick() {
                      const newValues = {
                        value: walletForm.childNodes[0].childNodes[1].value,
                        description: walletForm.childNodes[1].childNodes[1].value,
                        currency: walletForm.childNodes[2].childNodes[1].value,
                        method: walletForm.childNodes[3].childNodes[1].value,
                        tag: walletForm.childNodes[4].childNodes[1].value,
                      };
                      dispatch(editExpense(expenses, expense.id, newValues));
                      walletForm.childNodes[5].remove();
                      walletForm.appendChild(addButton);
                    };
                    walletForm.appendChild(editButton);
                  } }
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  className="removeButton"
                  type="button"
                  onClick={ () => dispatch(removeExpense(expenses, expense.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
