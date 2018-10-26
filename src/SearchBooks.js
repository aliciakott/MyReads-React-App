import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    searchResults: [],
    query: '',
    runSearch: false
  }

  updateQuery = (query) => {
    const newQuery = query.replace(/[^\w\s]|[\d]/g, '')
    this.setState(
      {
        query: newQuery.trim(),
        runSearch: true
      }
    )
  }

  updateResults = (results, searchAgain) => {
    this.setState(
      {
        searchResults: results,
        runSearch: searchAgain
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.runSearch === true) {
      if (this.state.query !== '') {
        BooksAPI.search(this.state.query)
          .then((results) => {
              this.updateResults(results, false)
          })
      } else {
        this.updateResults([], false)
      }
    }
  }

  render() {
    if (this.state.searchResults.length > 1) {
      this.state.searchResults.map((book) => {
        if (book.imageLinks === undefined) {
          book.imageLinks = {
            thumbnail: ''
          }
        }
        return null
      })
    }

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

        {Array.isArray(this.state.searchResults) === true && (
          <div className="search-books-results">
            <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select value="move" onChange={(event) => this.props.changeShelf(book, event)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
            </ol>
          </div>
        )}


        {(this.state.searchResults === undefined ||
          this.state.searchResults.length === undefined) && (
            <div>Sorry! No matches.</div>
        )}

      </div>
    )
  }
}

export default SearchBooks
