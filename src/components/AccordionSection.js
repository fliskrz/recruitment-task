import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class AccordionSection extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props);
    this.state = {
      description:''
    }
  }

  onClick = () => {
    this.props.onClick(this.props.name);
  };

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&indexpageids=1&prop=description&titles=${this.props.name}`)
      .then((res) => {
        let id = res.data.query.pageids[0];
        this.setState({
          description: res.data.query.pages[id].description
        })
      })
  }

  render() {
    const {
      onClick,
      props: { open, name },
    } = this;

    return (
      <div className='accordion-element'
        style={{
          
        }}
      >
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          {name}
        </div>
        {open && (
          <div className='accodion-element-description'>
            {this.state.description}
          </div>
        )}
      </div>
    );
  }
}

export default AccordionSection;