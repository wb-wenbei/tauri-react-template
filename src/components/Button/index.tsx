import React from 'react'
import styles from './index.module.less'

interface CustomButtonProps {
  children?: React.ReactNode
  inactive?: boolean
  onClick?: () => void
}

const Button: React.FC<CustomButtonProps> = ({ children = '自动模式', inactive = false, onClick }) => {
  return (
    <button className={`${styles.customButton} ${inactive ? styles.inactive : ''}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
