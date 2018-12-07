import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../apiConfig.js'

// const marvelKey = 1e8ae23add929fcff17a2a1be0f7aa53

class ComicIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = { comics: []}

  }

  async componentDidMount() {

    const response = await axios.get(`${API_URL}/comics`)
    this.setState({comics:response.data.results})
  //   .then(response => {
  //     this.setState({comics:response.data.comics})
  //   })
  }

  async handleDelete(event, id) {

    event.preventDefault()

    const response = axios.delete(`${API_URL}/comics/${id}`)

    console.log(response)

    const updatedComicList = this.state.comics.filter(comic => comic.id !== id)
    this.setState({comics: updatedComicList})

  }

  render() {
    console.log('render')
    const comicRows = this.state.comics.map(movie => {
      const {id, title, director} = movie

      return (
        <tr key={id}>
          <td>
            <Link to={`/comics/${id}`}>{ title }</Link>
          </td>
          <td>{director}</td>
          <td>
            <Link to={`/comics/${id}/edit`}>Edit</Link>
          </td>
          <td>
            <a href="#" onClick={ (event)=> {

              return this.handleDelete(event, id)

            }}>/ Delete </a>

          </td>
        </tr>
      )
    })
    const metaData = comic.data.results[0]
    const {thumbnail, issueNumber, pageCount, dates, prices} = metaData

    return (
      <React.Fragment>

        <div className="comic">
          <div className="thumbnail-container">
            <img className="comic-thumbnail" src={`${thumbnail.path}.${thumbnail.extension}`}/>
          </div>
          <main className="comic-data-container">
            <h1>{metaData.title}</h1>
            <p>Issue: {issueNumber}</p>
            <p>Pages: {pageCount}</p>
            <p>Date: {new Date(dates[0].date).toLocaleDateString()}</p>
            <p>Price: ${prices[0].price}</p>
          </main>
        </div>
      </React.Fragment>
    )
  }

}

export default ComicIndex
