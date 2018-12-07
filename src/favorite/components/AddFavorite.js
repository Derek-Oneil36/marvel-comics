import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig.js'


class AddFavorite extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      favorite: {
        comicId: ''
      }
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const favorite = this.state.favorite

    const response = await axios.post(`${API_URL}/favorites`, {favorite})

    this.props.history.push('/favorites')

    console.log('newfavorite: ', response)
  }


  render() {

    return (
      <React.Fragment>

        <button onClick={this.handleSubmit}>Add</button>

      </React.Fragment>
    )
  }
}


export default AddFavorite
