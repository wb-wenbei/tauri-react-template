import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'

type Option = {
  label: React.ReactNode
  value: React.Key
}

interface Props {
  defaultValue?: React.Key
  value?: React.Key
  onChange?: (e: React.Key) => void
  options: Option[]
}

const Toggle: React.FC<Props> = ({ defaultValue = '', value, options, onChange }) => {
  const [currentValue, setCurrentValue] = useState<React.Key>(defaultValue)

  const left = useMemo(() => options[0], [options])
  const right = useMemo(() => options[1], [options])

  const handleToggle = (e: React.Key) => {
    if (e === currentValue) return
    // setCurrentValue(e)
    if (onChange) onChange(e)
  }

  useEffect(() => {
    setCurrentValue(value || defaultValue)
  }, [value])

  return (
    <div className={styles.toggleContainer}>
      <div
        className={styles.toggleSlider}
        style={{
          transform: currentValue === left.value ? 'translateX(0)' : 'translateX(72px)',
        }}
      ></div>

      <div className={styles.toggleOption} onClick={() => handleToggle(left?.value)}>
        {left?.label}
      </div>

      <div className={styles.toggleOption} onClick={() => handleToggle(right?.value)}>
        {right?.label}
      </div>
    </div>
  )
}

export default Toggle
