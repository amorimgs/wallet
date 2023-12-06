import React from 'react';
import { useSelector } from 'react-redux';
import { StateType, StoreType } from '../types';

function Header() {
  const [ask, setAsk] = React.useState(0);
  const { email } = useSelector((store:StoreType) => store.user);
  const { expenses } = useSelector((state: StateType) => state.wallet);
  React.useEffect(() => {
    if (expenses.length > 0) {
      const total = expenses.reduce((acc, value) => {
        const ValueMoeda = +value.exchangeRates[value.currency].ask;
        const Conversao = +value.value * ValueMoeda;
        return acc + Conversao;
      }, 0);
      setAsk(+total);
    } else {
      setAsk(0);
    }
  }, [expenses]);

  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">{ ask.toFixed(2) }</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
