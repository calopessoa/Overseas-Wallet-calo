import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { fetchAPI, addExpenses, addEditExpenses } from '../actions';
import { paymentOptions, tagOptions } from '../helpers/renders';
import '../styles/form.css';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      id: 0,
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    });
  }

  componentDidMount() {
    const { propOfFetchAPI } = this.props;
    propOfFetchAPI();
  }

  // Função genérica para fazer as mudanças nos campos;
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // engine para jogar ao estado global ao submeter os dados; controlará a id para evitar conflito de itens;
  handleSubmit = async () => {
    const { propOfAddExpenses, exchanges, propOfFetchAPI } = this.props;
    await propOfFetchAPI();
    // let { id } = this.state;
    this.setState({
      exchangeRates: exchanges }, () => {
      propOfAddExpenses(this.state);
      // this.setState({ id: id += 1, value: 0 });
      this.setInitialState();
    });
  }

  // gatilho para manipular a edição das despesas inseridas; ao executar o botao, retornará o estado de 'em edição' para falso;
  handleEditExpenses = () => {
    const { propOfEdit } = this.props;
    propOfEdit(this.state);
    this.setInitialState();
  }

  setInitialState() {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    }));
  }

  render() {
    const { description, value, currency, tag, method } = this.state;
    const { currencies, isEdit } = this.props;
    const { handleChange, handleSubmit, handleEditExpenses } = this;
    return (
      <div>
        <fieldset className="form-content">
          <label
            htmlFor="value"
          >
            Valor
            <input
              name="value"
              data-testid="value-input"
              id="value"
              type="text"
              onChange={ handleChange }
              value={ value }
            />
          </label>
          <label
            htmlFor="description"
          >
            Descrição
            <input
              name="description"
              data-testid="description-input"
              id="description"
              type="text"
              onChange={ handleChange }
              value={ description }
            />
          </label>
          {/* problema no teste do req 10 */}
          <Select
            id="currency"
            testid="currency-input"
            title="Moeda"
            name="currency"
            value={ currency }
            array={ currencies }
            handleChange={ handleChange }
          />

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ handleChange }
            >
              { paymentOptions() }
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ handleChange }
            >
              { tagOptions() }
            </select>
          </label>

          { isEdit ? (
            <button
              type="button"
              onClick={ () => handleEditExpenses(this.state) }
              className="btn btn-success"
            >
              Editar Despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ () => handleSubmit(this.state) }
              className="btn btn-success"
            >
              Adicionar Despesa
            </button>
          ) }

        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchanges: state.wallet.exchanges,
  isEdit: state.wallet.isEdit,
  editExpenditure: state.wallet.editExpenditure,
});

const mapDispatchToProps = (dispatch) => ({
  propOfFetchAPI: () => dispatch(fetchAPI()),
  propOfAddExpenses: (payload) => dispatch(addExpenses(payload)),
  propOfEdit: (state) => dispatch(addEditExpenses(state)),
});

Form.propTypes = {
  exchanges: propTypes.element,
  propOfFetchAPI: propTypes.func,
  propOfAddExpenses: propTypes.func,
  currencies: propTypes.arrayOf(
    propTypes.string,
  ).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
