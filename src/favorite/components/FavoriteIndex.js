import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NewFavorite from '../../favorite/components/NewFavorite'

const PUBLIC_KEY  = '1e8ae23add929fcff17a2a1be0f7aa53'
const API_URL = 'https://gateway.marvel.com:443/v1/public/characters'
console.log('key: ', PUBLIC_KEY)

class CharacterIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = { favorites: [], comicIds: []}

  }

  async componentDidMount() {
    const token = this.props.user.token

    const comicIds = await axios.get('http://localhost:4741/favorites', { headers: { Authorization: `Bearer ${token}` } })
    console.log(comicIds)
    this.setState({comicIds:comicIds.data.favorites.comicId})
    comicIds.forEach(id => {
      const response = axios.get(`${API_URL}/${id.id}?apikey=${PUBLIC_KEY}`)
    })
    this.setState({favorites:response.data.data.results})
    //   .then(response => {
    //     this.setState({movies:response.data.movies})
    //   })
    console.log(this.state.comicIds)
  }

  render() {

    console.log('user: ',this.props)

    const characterRows = this.state.favorites.map(character => {
      const {id, name, thumbnail, description } = character
      if (this.props.user){
        return (
          <tr key={id}>
            <td>

              <h3>{name}</h3>
              <h4>ID: {id}</h4>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <p>Description: {description}</p>
              <NewFavorite id={id} component={NewFavorite}/>
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
    console.log('favorites: ', this.state.comicIds)

    return (
      <React.Fragment>

        <h1>Favorites</h1>

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
