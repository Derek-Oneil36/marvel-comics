import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class NewFavorite extends React.Component {

  constructor(props) {
    super(props)
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const response = await axios.post('http://localhost:4741/favorites')

    // this.setState(this.baseMovie)
    // this.setState({flashMessage: 'Success', movie: this.baseMovie})

  }


  render() {

    return (
      <React.Fragment>

        <button onClick={this.handleSubmit}>Add to Favorites</button>

      </React.Fragment>
    )
  }
}


export default NewFavorite
