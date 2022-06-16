import React, { useContext } from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Context from '@/presentation/context/form/form-context'
import styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  const { isLoading } = state
  const { main } = errorState
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      { isLoading && <Spinner className={styles.spinner} /> }
      { main && <span className={styles.error}>{main}</span> }
    </div>
  )
}

export default FormStatus
