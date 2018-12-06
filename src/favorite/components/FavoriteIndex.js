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
    const comics = []
    axios.get('http://localhost:4741/favorites', { headers: { Authorization: `Bearer ${token}` } })

      .then((comicIds) => (this.setState({comicIds:comicIds.data.favorites.map(comic => comic.comicId)})))

      .then(() => {
        const getRequests = this.state.comicIds.map(id => {
          return axios.get(`${API_URL}/${id}?apikey=${PUBLIC_KEY}`)
          // comics.push(response)
        })
        Promise.all(getRequests)
          .then((characters) => {
            console.log(characters)
            this.setState({favorites: characters})
          })
      })

      .catch(console.log)
    console.log('favorites: ', this.state.favorites)
    console.log('comicIds: ', this.state.comicIds)
  }

  render() {

    console.log('favorites: ', this.state.favorites[0])

    const characterRows = this.state.favorites.map(character => {
      const {id, name, thumbnail, description } = character.data.data.results[0]
      console.log('id: ', id, 'thumbnail: ', thumbnail)
      if (this.props.user){
        return (
          <tr>
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
    console.log('favorites: ', this.state)

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
