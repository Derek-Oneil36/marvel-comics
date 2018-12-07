import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig.js'
import AddFavorite from '../../favorite/components/AddFavorite'

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

  async handleAdd(event, id) {
    console.log('event: ', event, 'id: ', id)
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
    //this.setState(this.state.favorite.comicId: id)
    // const response = axios.post('http://localhost:4741/favorites',
    //     { headers: { Authorization: `Bearer ${token}` } })
    // const response = axios({
    //   headers: 'Authorization: Bearer ' + token,
    //   method: 'POST',
    //   url: 'http://localhost:4741/favorites',
    //   favorite: {
    //     comicId: id
    //   }
    // })
    // console.log(response)

  }

  render() {
    const characterRows = this.state.characters.map(character => {
      const {id, name, thumbnail, description } = character

      if (this.state.user){
        return (
          <tr key={id}>
            <td>
              <h3>{name}</h3>
              <h4>ID: {id}</h4>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <p>Description: {description}</p>
              <button onClick={(event)=> {
                return this.handleAdd(event, id)
              }}>Add</button>
            </td>
          </tr>
        )
      } else {
        return (
          <tr key={id}>
            <td>
              <h3>{name}</h3>
              <h4>ID: {id}</h4>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <p>Description: {description}</p>
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
