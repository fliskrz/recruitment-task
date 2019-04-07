import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccordionSection from './AccordionSection';

class Accordion extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach(child => {
      if (child.props.open) {
        openSections[child.props.name] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = name => {
    const {
      props: { allowMultipleOpen },
      state: { openSections },
    } = this;

    const open = !!openSections[name];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [name]: !open
        }
      });
    } else {
      this.setState({
        openSections: {
          [name]: !open
        }
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections },
    } = this;

    return (
      <div className='accordion'>
        {children.map((child,i) => (
          <AccordionSection
            key={i}
            open={!!openSections[child.props.name]}
            name={child.props.name}
            onClick={onClick}
          />
        ))}
      </div>
    );
  }
}

export default Accordion;