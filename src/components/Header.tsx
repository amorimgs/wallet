import React from 'react';
import { useSelector } from 'react-redux';
import { StateType, StoreType } from '../types';
import style from './Header.module.css';

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
    <header className={ style.header }>
      <p className={ style.title }>My Wallet</p>
      <div className={ style.dispesas }>
        <p>Total Dispesas:</p>
        <p data-testid="total-field" className={ style.field }>{ ask.toFixed(2) }</p>
        <p data-testid="header-currency-field" className={ style.currency }>BRL</p>
      </div>
      <p data-testid="email-field" className={ style.email }>{ email }</p>
    </header>
  );
}

export default Header;
