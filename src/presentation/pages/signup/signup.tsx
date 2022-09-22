import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'
import React from 'react'
import styles from './signup-styles.scss'
import Context from '@/presentation/context/form/form-context'
import { Link } from 'react-router-dom'


const Signup: React.FC = () => {
  

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={styles.form}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder='Digite seu nome'/>
          <Input type="email" name="email" placeholder='Digite seu e-mail'/>
          <Input type="password" name="password" placeholder='Digite sua senha'/>
          <Input type="password" name="passwordConfirmation" placeholder='Repita sua senha'/>
          <button type="submit">Salvar</button>
          <Link to="/login" className={styles.link}>Voltar</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
