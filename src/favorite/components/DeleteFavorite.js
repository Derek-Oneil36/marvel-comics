import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig.js'
import FavoriteIndex from '../../favorite/components/FavoriteIndex'


class DeleteFavorite extends React.Component {

  constructor(props) {
    super(props)
  }

  handleDelete = (event, id) => {
    event.preventDefault()

    const response = axios.delete(`${API}/favorites/${id}`)

    console.log(response)

    const updatedFavoriteList = FavoriteIndex.this.state.favorites.filter(charater => charater.id !== id)
    FavoriteIndex.this.setState({favorites: updatedFavoriteList})
  }


  render() {

    return (
      <React.Fragment>

        <button onClick={this.handleDelete}>Remove</button>

      </React.Fragment>
    )
  }
}


export default DeleteFavorite
