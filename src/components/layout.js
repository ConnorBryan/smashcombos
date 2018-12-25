import React from 'react'

import Header from './header'
import Footer from './footer'
import './layout.scss'

export default function Layout({ children }) {
  return (
    <section className="Layout">
      <Header />
      <div className="Layout-content">{children}</div>
      <Footer />
    </section>
  )
}
