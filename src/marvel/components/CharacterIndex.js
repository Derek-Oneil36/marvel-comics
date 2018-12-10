import React from 'react'
import axios from 'axios'
import messages from '../messages'
import { Link } from 'react-router-dom'
import API_URL from '../../apiConfig.js'


const PUBLIC_KEY  = '1e8ae23add929fcff17a2a1be0f7aa53'
const M_API_URL = 'https://gateway.marvel.com:443/v1/public/characters'



class CharacterIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = { characters: [],
      'favorite': {
        'comicId': ''
      },
      'user': this.props.user
    }
  }

  async componentDidMount() {

    const response = await axios.get(`${M_API_URL}?limit=100&apikey=${PUBLIC_KEY}`)
    this.setState({characters:response.data.data.results,})

  }

  // we're taking the event and the character id
  handleAdd(event, id) {
    event.preventDefault()

    const { flash } = this.props
    const token = this.state.user.token
    const favorite = {
      comicId: id
    }


    const apiCreateFavorite = (favorite, token) => {
      return fetch(API_URL+'/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token token=${token}`
        },
        body: JSON.stringify({
          favorite
        })
      })
    }

    apiCreateFavorite(favorite,token)
      .then(() => flash(messages.addCharacterSuccess, 'flash-success'))

  }

  render() {

    const characterRows = this.state.characters.map(character => {
      const {id, name, thumbnail, description } = character

      if (this.state.user){
        return (
          <tr key={id}>
            <td>
              <h3>{name}</h3>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <p> {description}</p>
              <button onClick={(event)=> {
                return this.handleAdd(event, id)
              }}>Add to Favorites</button>
            </td>
          </tr>
        )
      } else {
        return (
          <tr key={id}>
            <td>
              <h3>{name}</h3>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <p>{description}</p>
            </td>
          </tr>
        )
      }
    })
    return (
      <React.Fragment>

        <h1>Character Index</h1>

        <table>
          <tbody>
            {characterRows}
          </tbody>
        </table>

      </React.Fragment>
    )
  }

}

export default CharacterIndex
