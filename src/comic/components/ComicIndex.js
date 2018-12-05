import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// const marvelKey = 1e8ae23add929fcff17a2a1be0f7aa53

const comic = {
  'code': 200,
  'status': 'Ok',
  'copyright': '© 2018 MARVEL',
  'attributionText': 'Data provided by Marvel. © 2018 MARVEL',
  'attributionHTML': '<a href=\'http://marvel.com\'>Data provided by Marvel. © 2018 MARVEL</a>',
  'etag': '84018819c168f952442d6b24e280f6b0e78d1374',
  'data': {
    'offset': 0,
    'limit': 20,
    'total': 1,
    'count': 1,
    'results': [
      {
        'id': 1000,
        'digitalId': 0,
        'title': 'Punisher, the Vol. I: Welcome Back, Frank (Trade Paperback)',
        'issueNumber': 0,
        'variantDescription': '',
        'description': 'Two unlucky cops draw the unenviable task of capturing the Punisher, while the ruthless Ma Gnucci and her gang will stop at nothing to see him dead.',
        'modified': '-0001-11-30T00:00:00-0500',
        'isbn': '0-7851-0783-5',
        'upc': '',
        'diamondCode': '',
        'ean': '',
        'issn': '',
        'format': 'Trade Paperback',
        'pageCount': 272,
        'textObjects': [
          {
            'type': 'issue_solicit_text',
            'language': 'en-us',
            'text': 'Two unlucky cops draw the unenviable task of capturing the Punisher, while the ruthless Ma Gnucci and her gang will stop at nothing to see him dead.'
          }
        ],
        'resourceURI': 'http://gateway.marvel.com/v1/public/comics/1000',
        'urls': [
          {
            'type': 'detail',
            'url': 'http://marvel.com/comics/collection/1000/punisher_the_vol_i_welcome_back_frank_trade_paperback?utm_campaign=apiRef&utm_source=1e8ae23add929fcff17a2a1be0f7aa53'
          }
        ],
        'series': {
          'resourceURI': 'http://gateway.marvel.com/v1/public/series/62',
          'name': 'Punisher, the Vol. I: Welcome Back, Frank (2005)'
        },
        'variants': [],
        'collections': [],
        'collectedIssues': [],
        'dates': [
          {
            'type': 'onsaleDate',
            'date': '2005-11-02T00:00:00-0500'
          },
          {
            'type': 'focDate',
            'date': '-0001-11-30T00:00:00-0500'
          }
        ],
        'prices': [
          {
            'type': 'printPrice',
            'price': 9.99
          }
        ],
        'thumbnail': {
          'path': 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/4bc66d86a4313',
          'extension': 'jpg'
        },
        'images': [
          {
            'path': 'http://i.annihil.us/u/prod/marvel/i/mg/6/40/4bc66d86a4313',
            'extension': 'jpg'
          }
        ],
        'creators': {
          'available': 2,
          'collectionURI': 'http://gateway.marvel.com/v1/public/comics/1000/creators',
          'items': [
            {
              'resourceURI': 'http://gateway.marvel.com/v1/public/creators/73',
              'name': 'Steve Dillon',
              'role': 'penciller'
            },
            {
              'resourceURI': 'http://gateway.marvel.com/v1/public/creators/30',
              'name': 'Stan Lee',
              'role': 'writer'
            }
          ],
          'returned': 2
        },
        'characters': {
          'available': 0,
          'collectionURI': 'http://gateway.marvel.com/v1/public/comics/1000/characters',
          'items': [],
          'returned': 0
        },
        'stories': {
          'available': 2,
          'collectionURI': 'http://gateway.marvel.com/v1/public/comics/1000/stories',
          'items': [
            {
              'resourceURI': 'http://gateway.marvel.com/v1/public/stories/63',
              'name': 'Two unlucky cops draw the unenviable task of capturing the Punisher, while the ruthless Ma Gnucci and her gang will stop at noth',
              'type': 'interiorStory'
            },
            {
              'resourceURI': 'http://gateway.marvel.com/v1/public/stories/65140',
              'name': 'PUNISHER, THE VOL. I: WELCOME BACK, FRANK 0 cover',
              'type': 'cover'
            }
          ],
          'returned': 2
        },
        'events': {
          'available': 0,
          'collectionURI': 'http://gateway.marvel.com/v1/public/comics/1000/events',
          'items': [],
          'returned': 0
        }
      }
    ]
  }
}

class ComicIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = { comics: []}

  }

  async componentDidMount() {

    const response = await axios.get('http://localhost:4741/comics')
    this.setState({comics:response.data.results})
  //   .then(response => {
  //     this.setState({comics:response.data.comics})
  //   })
  }

  async handleDelete(event, id) {

    event.preventDefault()

    const response = axios.delete(`http://localhost:4741/comics/${id}`)

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
