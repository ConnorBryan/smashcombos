import React from 'react'

import './tag.scss'

export default function Tag({ children, className = '', ...rest }) {
  return <div className={`Tag ${className}`}>{children}</div>
}
