import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import * as BooksAPI from './BooksAPI'
import EachBook from './EachBook.js'

class SearchBooks extends Component {
  state = {
    searchResults: [],
  }

  updateQuery = debounce((query) => {
    const newQuery = query.replace(/[^\w\s]|[\d]/g, '').trim()
    if (newQuery !== '') {
      BooksAPI.search(newQuery)
        .then((results) => {
          this.setState({
            searchResults: results,
          })
        })
    } else {
      this.setState({
        searchResults: [],
        })
    }
  }, 500)

  checkKeys = () => {
    if (Array.isArray(this.state.searchResults)) {
      this.state.searchResults.map((book) => {
        if (book.imageLinks === undefined) {
          book.imageLinks = {
            thumbnail: ''
          }
        }
        if (book.title === undefined) {
          book.title = ''
        }
        if (book.authors === undefined) {
          book.authors = ['']
        }
        if (book.shelf === undefined) {
          let checkShelf = this.props.books.filter(b => b.id === book.id)
          if (checkShelf[0] === undefined) {
            book.shelf = 'none'
          } else {
            book.shelf = checkShelf[0].shelf
          }
        }
      })
    }
    return null
  }

  render() {
    this.checkKeys()

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)}/>

          </div>
        </div>

        {Array.isArray(this.state.searchResults) ? (
          <div className="search-books-results">
            <ol className="books-grid">
            {this.state.searchResults.map(book =>
              <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
            )}
            </ol>
          </div>
        ) : (
          <div className="search-books-results">
            Sorry, no books matched your search. Please try again.
          </div>
        )}

      </div>
    )
  }
}

export default SearchBooks
