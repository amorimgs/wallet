import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../redux/actions';

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
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          dispatch(userAction(formData.email));
          navigate('/carteira');
        } }
      >
        <input
          type="text"
          id="email"
          data-testid="email-input"
          placeholder="email"
          value={ formData.email }
          onChange={ (event) => {
            handleChange(event);
          } }
        />
        <input
          id="senha"
          type="password"
          data-testid="password-input"
          placeholder="senha"
          value={ formData.senha }
          onChange={ (event) => {
            handleChange(event);
          } }
        />
        <button disabled={ !validateInput() } type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
