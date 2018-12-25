import React from 'react'

import './input.scss'

export default function Input({ ...rest }) {
  return <input className="Input" type="text" {...rest} />
}
