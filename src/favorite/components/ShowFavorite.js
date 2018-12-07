import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig.js'


class ShowFavorite extends React.Component {
  constructor(props){
    super (props)
    this.state = {
      favorite:{
        name: '',
        thumbnail: '',
        description: ''
      }
    }
  }

  componentDidMount(){

    const id = this.props.match.params.id
    const response =  axios.get(`${API_URL}/favorites/${id}`)
    const favorite = response.data.data.results[0]
    this.setState({
      favorite: favorite
    })
    console.log(this.state.favorite)
  }

  render() {
    if (this.state.favorites.description === '') {
      return (
        <React.Fragment>

          <h1>Favorite:</h1>
          <p>{this.state.favorite.name}</p>
          <p>{this.state.favorite.thumbnail}</p>

        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>

          <h1>Favorite:</h1>
          <p>{this.state.favorite.name}</p>
          <p>{this.state.favorite.thumbnail}</p>
          <p>{this.state.favorite.description}</p>


        </React.Fragment>
      )
    }
  };

}

export default ShowFavorite
