import React, { Component } from 'react'
//import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import EachBook from './EachBook.js'

class SearchBooks extends Component {
  state = {
    searchResults: [],
    querySuccess: false
  }

  updateQuery = (query) => {
    const newQuery = query.replace(/[^\w\s]|[\d]/g, '').trim()
    if (newQuery !== '') {
      BooksAPI.search(newQuery)
        .then((results) => {
          if (Array.isArray(results)) {
            this.setState({
              searchResults: results,
              querySuccess: true
            })
          } else {
            this.setState({
              searchResults: results,
              querySuccess: false
              })
          }
        })
    } else {
      this.setState({
        searchResults: [],
        querySuccess: false
        })
    }
  }

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
          book.shelf = 'none'
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

        {this.state.querySuccess === true && (
          <div className="search-books-results">
            <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
            ))}
            </ol>
          </div>
        )}

        {(this.state.querySuccess === false) && (
          <div>Sorry, no books matched your search terms. Please try again.</div>
        )}

      </div>
    )
  }
}

export default SearchBooks
