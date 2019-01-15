import React from 'react'
import axios from 'axios'
import messages from '../messages'
import API_URL from '../../apiConfig.js'
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'

const PUBLIC_KEY  = '1e8ae23add929fcff17a2a1be0f7aa53'
const M_API_URL = 'https://gateway.marvel.com:443/v1/public/characters'

class FavoriteIndex extends React.Component {

  constructor (props) {
    super(props)
    this.state = { favorites: [], comicIds: [], favIds: [],
      'user': this.props.user}

  }

  /*
  setting the state of our favorites, comicIds, and favIds obj with the data
  retrieved from Marvel's APi call.
  */
  async componentDidMount() {
    const token = this.props.user.token
    const comics = []
    axios.get(`${API_URL}/favorites`, { headers: { Authorization: `Bearer ${token}` } })

      .then((comicIds) => (this.setState({
        comicIds:comicIds.data.favorites.map(comic => comic),
        favIds: comicIds.data.favorites.map(fav => fav)
      })))

      .then(() => {
        const getRequests = this.state.comicIds.map(id => {
          return axios.get(`${M_API_URL}/${id.comicId}?apikey=${PUBLIC_KEY}`)
          // comics.push(response)
        })

        Promise.all(getRequests)
          .then((characters) => {

            this.setState({favorites: characters})
          })
      })

      .catch(console.log)

  }

  /* uses the favorite chracter id to delete the chracter
  from the favorites list when the remove button is clicked.
  */
  handleDelete(event, _id) {
    event.preventDefault()

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

      //resets state by clearing and calling DidMount
      .then(() => {
        this.setState({
          favorites: [],
          comicIds: [],
          favIds: [],
          'user': this.props.user
        })
        this.componentDidMount()
      })
      .then(() => flash(messages.removeCharacterSuccess, 'flash-success'))
      .catch(() => {
        flash(messages.removeCharacterFailure, 'flash-error')
      })

  }

  /*
  Favorite character data will render along with the
  remove from favorites button.
  */
  render() {

    const characterRows = this.state.favorites.map((character, i) => {
      const {id, name, thumbnail, description } = character.data.data.results[0]
      const { _id } = this.state.comicIds[i]

      if (description == ''){
        return (
          <div key={id}>
            <Card>
              <CardHeader>{name}</CardHeader>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <CardBody>
                <CardText>Sorry no description provided at this time.</CardText>
                <Button onClick={(event)=> {
                  return this.handleDelete(event, _id)
                }}>Remove</Button>
              </CardBody>
            </Card>
          </div>
        )
      } else
        return (
          <div key={i}>
            <Card>
              <CardHeader>{name}</CardHeader>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <CardBody>
                <CardText>{description}</CardText>
                <Button onClick={(event)=> {
                  return this.handleDelete(event, _id)
                }}>Remove</Button>
              </CardBody>
            </Card>
          </div>
        )
    })
    return (
      <React.Fragment>
        <h3>Favorites</h3>
        <Container>
          <Row>
            <Col>{characterRows}</Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default FavoriteIndex
