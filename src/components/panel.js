import React from 'react'

import './panel.scss'

export default function Panel({ children, className = '', ...rest }) {
  return (
    <section className={`Panel ${className}`} {...rest}>
      {children}
    </section>
  )
}
