import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../redux/actions';
import style from './Login.module.css';

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    senha: '',
  });
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };
  const validateInput = () => {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/i;
    const validateEmail = regexEmail.test(formData.email);
    const validateSenha = formData.senha.length > 5;
    if (validateEmail && validateSenha) {
      return true;
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={ style.mainContainer }>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          dispatch(userAction(formData.email));
          navigate('/carteira');
        } }
        className={ style.form }
      >
        <p className={ style.title }>My Wallet</p>
        <input
          className={ style.Input }
          type="text"
          id="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ formData.email }
          onChange={ (event) => {
            handleChange(event);
          } }
        />
        <input
          className={ style.Input }
          id="senha"
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          value={ formData.senha }
          onChange={ (event) => {
            handleChange(event);
          } }
        />
        <button
          className={ style.buttonSubmit }
          disabled={ !validateInput() }
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
