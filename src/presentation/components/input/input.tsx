import React, { useContext } from 'react'
import styles from './input-styles.scss'
import Context from '@/presentation/context/form/form-context'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]
  const getStatus = (): string => {
    return '🔴'
  }
  const getTitle = (): string => {
    return error
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleChange} />
      <span data-testid={`${props.name}-status`} title={getTitle()} className={styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
