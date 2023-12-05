import { useSelector } from 'react-redux';
import { StoreType } from '../types';

function Header() {
  const { email } = useSelector((store:StoreType) => store.user);
  console.log(email);
  return (
    <div>
      <p data-testid="email-field">{ email }</p>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
