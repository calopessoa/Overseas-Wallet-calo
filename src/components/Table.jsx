import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenditure, editExpense } from '../actions';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses, propRemove, editExpenditure } = this.props;
    return (
      <table className="table">
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
        <tbody className="tbody">
          {expenses
            .map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(expense.value)
                  * Number(expense.exchangeRates[expense.currency].ask))
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => { editExpenditure(expense.id); } }
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => propRemove(expense.id) }
                    className="btn btn-danger"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  propRemove: PropTypes.func,
  editExpenditure: PropTypes,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRate: PropTypes.objectOf(PropTypes.object),
  })).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  propRemove: (payload) => dispatch(removeExpenditure(payload)),
  editExpenditure: (state) => dispatch(editExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
