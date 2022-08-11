import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import styles from './login-styles.scss'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      emailError: validation.validate('email', state.email)
    }))
  }, [state.email])
  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState((oldState) => ({
        ...oldState,
        isLoading: true
      }))
      const account = await authentication.auth({ email: state.email, password: state.password })
      await saveAccessToken.save(account.accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setState((oldState) => ({
        ...oldState,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu e-mail'/>
          <Input type="password" name="password" placeholder='Digite sua senha'/>
          <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
