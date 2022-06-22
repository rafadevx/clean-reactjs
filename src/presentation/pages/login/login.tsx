import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import styles from './login-styles.scss'
import Context from '@/presentation/context/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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
    if (state.isLoading || state.emailError || state.passwordError) {
      return
    }
    setState((oldState) => ({
      ...oldState,
      isLoading: true
    }))
    await authentication.auth({ email: state.email, password: state.password })
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
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
