import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

import './grouping.scss'

export default class Grouping extends Component {
  state = {
    expanded: true,
  }

  toggleExpanded = () =>
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }))

  render() {
    const { title, children, className = '', ...rest } = this.props
    const { expanded } = this.state

    return (
      <section className={`Grouping ${className}`} {...rest}>
        <div
          className="Grouping-title"
          onClick={this.toggleExpanded}
          role="button"
        >
          <h2>{title}</h2>
          <FontAwesomeIcon icon={expanded ? faCaretDown : faCaretUp} />
        </div>
        {expanded && <div className="Grouping-content">{children}</div>}
      </section>
    )
  }
}
