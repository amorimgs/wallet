import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailTest = 'test@test.com';
const initialState = {
  user: { email: emailTest },
  wallet: {
    currencies: ['USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE'],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};
const ROUTE = ['/carteira'];

test('Verifica se a tela Home é exibida corretamente!', () => {
  renderWithRouterAndRedux(<App />);
  screen.getByRole('textbox');
  screen.getByPlaceholderText(/senha/i);
  const btn = screen.getByRole('button', {
    name: /entrar/i,
  });
  expect(btn).toBeDisabled();
});

test('Realiza o login, com dados corretos.!', async () => {
  const { store } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByRole('textbox');
  const passInput = screen.getByPlaceholderText(/senha/i);
  const btnForm = screen.getByRole('button', {
    name: /entrar/i,
  });
  expect(btnForm).toBeDisabled();
  await userEvent.type(emailInput, emailTest);
  await userEvent.type(passInput, '0000000');
  expect(btnForm).not.toBeDisabled();
  await userEvent.click(btnForm);
  const { user } = store.getState();
  expect(user).toEqual({ email: emailTest });
  screen.getByText(/test@test\.com/i);
});

test('Verifica se a tela Wallet é exibida corretamente!', async () => {
  const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ROUTE });
  screen.getByText(/test@test\.com/i);
  const field = screen.getByTestId('total-field');
  const description = screen.getByTestId('description-input');
  const tag = screen.getByTestId('tag-input');
  const value = screen.getByTestId('value-input');
  const method = screen.getByTestId('method-input');
  const currency = screen.getByTestId('currency-input');
  const btn = screen.getByRole('button', {
    name: /adicionar despesa/i,
  });
  expect(field).toHaveTextContent('0');
  await userEvent.type(description, 'Test');
  await userEvent.selectOptions(tag, 'Lazer');
  await userEvent.type(value, '2');
  await userEvent.selectOptions(method, 'Dinheiro');
  await userEvent.selectOptions(currency, 'USD');
  await userEvent.click(btn);
  expect(description).toHaveTextContent('');
  expect(value).toHaveTextContent('');
  console.log(store.getState());
});
