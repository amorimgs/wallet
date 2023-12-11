import { useDispatch, useSelector } from 'react-redux';
import { ExpensesType, StateType } from '../types';
import { editarDispesa, removeDispesa } from '../redux/actions';
import style from './Table.module.css';
import editar from '../assets/Editar.svg';
import excluir from '../assets/excluir.svg';

function Table() {
  const { expenses, editor } = useSelector((state:StateType) => state.wallet);
  const dispatch = useDispatch();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const newExpense = expenses.filter((el) => el.id !== +e.currentTarget.id);
    switch (e.currentTarget.children[0].getAttribute('alt')) {
      case 'Excluir':
        dispatch(removeDispesa(newExpense));
        break;
      case 'Editar':
        dispatch(editarDispesa(e.currentTarget.id));
        break;
      default:
        break;
    }
  };

  return (
    <div className={ style.tableContainer }>
      <table className={ style.table }>
        <thead className={ style.cabecalho }>
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
          {
            expenses.length > 0 && expenses.map((el:ExpensesType) => {
              return (
                <tr key={ el.id } className={ style.lineTable }>
                  <td>{ el.description }</td>
                  <td>{ el.tag }</td>
                  <td>{ el.method }</td>
                  <td>{ (+el.value).toFixed(2) }</td>
                  <td>{ el.exchangeRates[el.currency].name }</td>
                  <td>{ (+el.exchangeRates[el.currency].ask).toFixed(2) }</td>
                  <td>{ (+el.value * +el.exchangeRates[el.currency].ask).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      className={ style.btnEditar }
                      data-testid="edit-btn"
                      id={ (el.id).toString() }
                      onClick={ (e) => handleClick(e) }
                    >
                      <img src={ editar } alt="Editar" />
                    </button>
                    <button
                      className={ style.btnExcluir }
                      id={ (el.id).toString() }
                      onClick={ (e) => handleClick(e) }
                      data-testid="delete-btn"
                      disabled={ editor }
                    >
                      <img src={ excluir } alt="Excluir" />
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>

  );
}

export default Table;
