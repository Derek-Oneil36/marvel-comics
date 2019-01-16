import React from 'react'
import axios from 'axios'
import '../character.scss'
import messages from '../messages'
import { Link } from 'react-router-dom'
import API_URL from '../../apiConfig.js'
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'


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

  /*
  setting the state of our characters obj with the data
  retrieved from Marvel's APi call.
  */
  async componentDidMount() {

    const response = await axios.get(`${M_API_URL}?limit=100&apikey=${PUBLIC_KEY}`)
    this.setState({characters:response.data.data.results,})

  }

  /*
  Adding the character id to our favorites once the user clicks
  on the add to favorites button.
  */
  handleAdd(event, id) {
    event.preventDefault()

    const { flash } = this.props
    const token = this.state.user.token
    const favorite = {
      comicId: id
    }

    /*
     makes an api call to the favorites route on the back-end using
     the APU_URL and the usre's login token.
    */
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

    // alerts user when a Marvel character is added to their favorites list.
    apiCreateFavorite(favorite,token)
      .then(() => flash(messages.addCharacterSuccess, 'flash-success'))

  }

  /*
  Marvel character data will render without a desctiption if
  the user is not signed in. The characters description will render when
  the user is signed in along with the add to favorites button. If the character
  doesn't have a description a default message with be generated.
  */
  render() {

    const characterRows = this.state.characters.map(character => {
      const {id, name, thumbnail, description } = character

      if (this.state.user && description != ''){
        return (
          <div key={id}>
            <Card>
              <CardHeader classname="comic-header">{name}</CardHeader>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <CardBody>
                <CardText>{description}</CardText>
                <Button onClick={(event)=> {
                  return this.handleAdd(event, id)
                }}>Add to Favorites</Button>
              </CardBody>
            </Card>
          </div>
        )
      } else if (this.state.user && description == ''){
        return (
          <div key={id}>
            <Card>
              <CardHeader classname="comic-header">{name}</CardHeader>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
              <CardBody>
                <CardText>Sorry no description provided at this time.</CardText>
                <Button onClick={(event)=> {
                  return this.handleAdd(event, id)
                }}>Add to Favorites</Button>
              </CardBody>
            </Card>
          </div>
        )
      } else {
        return (
          <div key={id}>
            <Card>
              <CardHeader classname="comic-header">{name}</CardHeader>
              <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
            </Card>
          </div>
        )
      }
    })
    return (
      <React.Fragment>
        <h3>Character Index</h3>
        <Container>
          <Row>
            <Col>{characterRows}</Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }

}

export default CharacterIndex
