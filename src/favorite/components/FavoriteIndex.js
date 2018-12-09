import React from 'react'
import axios from 'axios'
import messages from '../messages'
import API_URL from '../../apiConfig.js'
import DeleteFavorite from '../../favorite/components/DeleteFavorite'

const PUBLIC_KEY  = '1e8ae23add929fcff17a2a1be0f7aa53'
const M_API_URL = 'https://gateway.marvel.com:443/v1/public/characters'

class FavoriteIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = { favorites: [], comicIds: [], favIds: [],
      'user': this.props.user}

  }

  async componentDidMount() {
    const token = this.props.user.token
    const comics = []
    axios.get(`${API_URL}/favorites`, { headers: { Authorization: `Bearer ${token}` } })

      .then((comicIds) => (this.setState({
        comicIds:comicIds.data.favorites.map(comic => comic.comicId),
        favIds: comicIds.data.favorites.map(fav => fav._id)
      })))

      .then(() => {
        const getRequests = this.state.comicIds.map(id => {
          return axios.get(`${M_API_URL}/${id}?apikey=${PUBLIC_KEY}`)
          // comics.push(response)
        })

        Promise.all(getRequests)
          .then((characters) => {

            this.setState({favorites: characters})
          })
      })

      .catch(console.log)

  }

  handleDelete(event, _id) {
    event.preventDefault()
    console.log('state info: ',this.props )
    console.log('user info: ',this.state.user )

    const { flash } = this.props
    const token = this.state.user.token

    const deleteFavorite = (_id, token) => {
      return fetch(`${API_URL}/favorites/${_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization':`Token token=${token}`
        }
      })
    }

    deleteFavorite(_id,token)
      .then(() => history.push('/favorites'))
      .catch(() => {
        flash(messages.removeCharacterFailure, 'flash-error')
      })

  }


  render() {
    const favIds = this.state.favIds
    console.log(this.state)
    const characterRows = this.state.favorites.map((character, i, favIds) => {
      const {id, name, thumbnail, description } = character.data.data.results[0]

      return (
        <tr key={i}>
          <td>
            <h4>{name}</h4>
            <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
            <p>{description}</p>
            <button onClick={(event)=> {
              return this.handleDelete(event, id)
            }}>Remove</button>
          </td>
        </tr>
      )
    })


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

export default FavoriteIndex
