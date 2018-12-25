import React from 'react'

import './button.scss'

export default function Button({ children, className = '', ...rest }) {
  return (
    <button className={`Button ${className}`} {...rest}>
      {children}
    </button>
  )
}
