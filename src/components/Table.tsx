import { useDispatch, useSelector } from 'react-redux';
import { ExpensesType, StateType } from '../types';
import { editarDispesa, removeDispesa } from '../redux/actions';

function Table() {
  const { expenses, editor } = useSelector((state:StateType) => state.wallet);
  const dispatch = useDispatch();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const newExpense = expenses.filter((el) => el.id !== +e.currentTarget.id);
    switch (e.currentTarget.textContent) {
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
    <div>
      <table>
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
        <tbody>
          {
            expenses.length > 0 && expenses.map((el:ExpensesType) => {
              return (
                <tr key={ el.id }>
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
                      data-testid="edit-btn"
                      id={ (el.id).toString() }
                      onClick={ (e) => handleClick(e) }
                    >
                      Editar
                    </button>
                    /
                    <button
                      id={ (el.id).toString() }
                      onClick={ (e) => handleClick(e) }
                      data-testid="delete-btn"
                      disabled={ editor }
                    >
                      Excluir
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
