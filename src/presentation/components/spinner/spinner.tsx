import React from 'react'
import styles from './spinner-styles.scss'

type SpinnerProps = React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps) => {
  return (
    <div {...props} className={[styles.spinner, props.className].join(' ')}>
      <div/><div/><div/><div/>
    </div>
  )
}

export default Spinner
