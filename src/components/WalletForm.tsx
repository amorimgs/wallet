import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDispesas, fetchCurrencies } from '../redux/actions';
import { Dispatch, StateType } from '../types';

function WalletForm() {
  const dispatch: Dispatch = useDispatch();
  const { currencies } = useSelector((state:StateType) => state.wallet);
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
    dispatch(addDispesas(dataForm));
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
        onSubmit={ (e) => {
          handleSubmit(e);
        } }
      >
        <label htmlFor="description">Descrição da despesa </label>
        <input
          onChange={ (e) => {
            handleChange(e);
          } }
          value={ dataForm.description }
          type="text"
          id="description"
          data-testid="description-input"
        />
        <label htmlFor="tag">Categoria da despesa</label>
        <select
          value={ dataForm.tag }
          data-testid="tag-input"
          id="tag"
          onChange={ (e) => {
            handleChange(e);
          } }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <label htmlFor="value">Valor</label>
        <input
          required
          value={ dataForm.value }
          type="number"
          id="value"
          data-testid="value-input"
          onChange={ (e) => {
            handleChange(e);
          } }
        />
        <label htmlFor="method">Método de pagamento</label>
        <select
          value={ dataForm.method }
          data-testid="method-input"
          id="method"
          onChange={ (e) => {
            handleChange(e);
          } }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="currency">Moeda</label>
        <select
          value={ dataForm.currency }
          data-testid="currency-input"
          id="currency"
          onChange={ (e) => {
            handleChange(e);
          } }
        >
          {currencies && currencies.map((el) => {
            return (
              <option key={ el } value={ el }>{ el }</option>
            );
          })}
        </select>
        <button type="submit">Adicionar despesa</button>
      </form>
    </div>
  );
}

export default WalletForm;
