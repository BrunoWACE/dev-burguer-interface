import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from './styles';

export function Login() {
  const navigate = useNavigate();
  const scherma = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O email é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Digite uma senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scherma),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    try {
      const {
        data: { token },
      } = await toast.promise(
        api.post('/sessions', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando seus dados...',
          success: {
            render() {
              setTimeout(() => {
                navigate('/');
              }, 2000);
              return 'Seja Bem-vindo(a)!';
            },
          },
          error: {
            render({ data: err }) {
              if (!err?.response) {
                return 'Servidor indisponível. Tente novamente mais tarde.';
              }
              if (err.response.status === 400) {
                return 'Email ou senha incorretas!';
              }
              return '😭 Falha no Sistema! Tente novamente';
            },
          },
        },
      );

      localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao
          <span>
            {' '}
            Dev Burguer!
            <br />
          </span>{' '}
          Acesse com seu
          <span> Login e senha</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
