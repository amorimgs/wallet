import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import style from './Wallet.module.css';

function Wallet() {
  return (
    <div className={ style.containerMain }>
      <div className={ style.bgForm }>
        <Header />
        <WalletForm />
      </div>
      <Table />
    </div>
  );
}

export default Wallet;
