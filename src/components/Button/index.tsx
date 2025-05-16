import React from 'react'
import styles from './index.module.css'

interface CustomButtonProps {
  label?: string
  onClick?: () => void
}

const Button: React.FC<CustomButtonProps> = ({ label = '自动模式', onClick }) => {
  return (
    <button className={styles.customButton} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
