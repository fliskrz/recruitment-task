import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Accordion from './Accordion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      list:[],
      cities:[],
      countries:[{name:'Poland', iso:'PL'},{name:'Germany', iso:'DE'},{name:'Spain', iso:'ES'},{name:'France', iso:'FR'}],
      error: false
    }
  }

  handleChange = (e) => {
    const { countries } = this.state;
    let filtered = countries.filter(
      country => country.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    this.setState({
      inputVal: e.currentTarget.value,
      list: filtered
    })
  }

  handleClick = (country) =>{
    this.setState({
      inputVal: country,
      list:[]
    })
  }

  handleSubmit = (e) => {
    const { countries } = this.state;
    e.preventDefault();
    let cities = [];
    let chosenCountry = countries.find(
      country => country.name.toLowerCase()===this.state.inputVal.toLowerCase()
    )
    if(chosenCountry){
      chosenCountry = chosenCountry.iso
      axios.get(`https://api.openaq.org/v1/cities?country=${chosenCountry}&limit=10`)
      .then((res) => {
          res.data.results.forEach(e => {
            cities.push(e.city);
          })
          this.setState({
            cities: cities,
            error:false
          })
      })
    }else{
      this.setState({
        error: true
      })
    }
    
  }

 


  render() {
    return (
      <div className='container'>
      <form className='form' onSubmit={this.handleSubmit} autoComplete='off'>
        <div className='autocomplete'>
          <label>Enter Country Name</label>
          <input className='textarea' type='text' name='country' value={this.state.inputVal} onChange={this.handleChange}/>
          {this.state.inputVal && (this.state.list.length > 0) && (<div className='list'>
            {this.state.list.map((country,i) => {
              return (<li onClick={()=>this.handleClick(country.name)} key={i}>{country.name}</li>)
            })}
          </div>)}
        </div>
        {this.state.error && <p className='error'>Enter valid country</p>}
        <input className='submit' type='submit' value='Search'/>
      </form>
      
      <Accordion allowMultipleOpen>
        {this.state.cities.map((e,i) => {
          return ( 
          <div key={i} name={e}>
          </div>
          )
        })}
      </Accordion>
    
      </div>

    );
  }
}

export default App;
