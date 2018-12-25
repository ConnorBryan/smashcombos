import React from 'react'
import { Link } from 'gatsby'

import './header.scss'

export default function Header() {
  return (
    <nav className="Header">
      <Link to="/">
        <h2>
          S<span className="Header-small">mash</span>C
          <span className="Header-small">ombos</span>
        </h2>
      </Link>
    </nav>
  )
}
