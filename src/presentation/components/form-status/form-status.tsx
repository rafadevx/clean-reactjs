import React from 'react'
import Spinner from '@/presentation/components/spinner/spinner'

import styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>erro</span>
    </div>
  )
}

export default FormStatus
