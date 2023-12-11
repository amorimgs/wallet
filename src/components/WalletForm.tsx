import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDispesas, fetchCurrencies, salvarDispesa } from '../redux/actions';
import { Dispatch, StateType } from '../types';
import style from './WalletForm.module.css';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const {
    currencies,
    editor, idToEdit } = useSelector((state:StateType) => state.wallet);
  const [dataForm, setDataForm] = React.useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  });

  React.useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setDataForm({ ...dataForm, [id]: value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editor) {
      dispatch(salvarDispesa({ ...dataForm, id: +idToEdit }));
    } else {
      dispatch(addDispesas(dataForm));
    }
    setDataForm({
      ...dataForm,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: dataForm.id + 1,
    });
  };

  return (
    <div>
      <form
        className={ style.form }
        onSubmit={ (e) => {
          handleSubmit(e);
        } }
      >
        <label
          htmlFor="description"
          className={ `${style.label} ${style.labelDescription}` }
        >
          Descrição da despesa
          <input
            onChange={ (e) => {
              handleChange(e);
            } }
            value={ dataForm.description }
            type="text"
            id="description"
            data-testid="description-input"
            className={ `${style.description} ${style.input}` }
          />
        </label>
        <label
          className={ `${style.label} ${style.labelTag}` }
          htmlFor="tag"
        >
          Categoria da despesa
          <select
            value={ dataForm.tag }
            data-testid="tag-input"
            id="tag"
            onChange={ (e) => {
              handleChange(e);
            } }
            className={ `${style.input} ${style.tag}` }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="value" className={ `${style.label} ${style.labelValue}` }>
          Valor
          <input
            required
            value={ dataForm.value }
            type="number"
            id="value"
            data-testid="value-input"
            onChange={ (e) => {
              handleChange(e);
            } }
            className={ `${style.input} ${style.value}` }
          />
        </label>
        <label htmlFor="method" className={ `${style.label} ${style.labelMethod}` }>
          Método de pagamento
          <select
            value={ dataForm.method }
            data-testid="method-input"
            id="method"
            onChange={ (e) => {
              handleChange(e);
            } }
            className={ `${style.input} ${style.method}` }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="currency" className={ `${style.label} ${style.labelCurrency}` }>
          Moeda
          <select
            value={ dataForm.currency }
            data-testid="currency-input"
            id="currency"
            onChange={ (e) => {
              handleChange(e);
            } }
            className={ `${style.input} ${style.currency}` }
          >
            {currencies && currencies.map((el) => {
              return (
                <option key={ el } value={ el }>{ el }</option>
              );
            })}
          </select>
        </label>
        <div>
          <button
            className={ style.submitButton }
            type="submit"
          >
            {editor ? 'Editar Despesa' : 'Adicionar despesa'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default WalletForm;
