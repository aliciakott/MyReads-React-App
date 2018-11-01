import React, { Component } from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    searchResults: [],
  }

  updateQuery = debounce((query) => {
    // debouncing prevents unexpected behavior in the search results when
    // backspace is hit too many times/too quickly

    const newQuery = query.replace(/[^\w\s]|[\d]/g, '').trim()
    // newQuery removes ALL numbers and symbols from the search terms, then
    // trims the spaces off the ends

    if (newQuery !== '') {
      // if the search term is not an empty string (ie, the user only pressed spaces)
      // the BooksAPI.search method searches the API for matches.
      // if there is a match, it returns an array of book objects, or, if there are no matches
      // an object, either of which are then passed to the state
      BooksAPI.search(newQuery)
        .then((results) => {
          this.setState({
            searchResults: results,
          })
        })
    } else {
      // an empty string sets the state to an empty array
      this.setState({
        searchResults: [],
        })
    }
  }, 500)

  checkKeys = () => {
    // this function checks the keys of every book object. If a key is expected but
    // not defined, this function assigns a default value
    let books = this.state.searchResults
    if (Array.isArray(books)) {
      books.map((book) => {
        if (book.title === undefined) {
          book.title = ''
        }
        if (book.authors === undefined) {
          book.authors = ['']
        }
        if (book.imageLinks === undefined) {
          book.imageLinks = {
            thumbnail: ''
          }
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
    let books = this.state.searchResults

    // sorts the books by title
    if (Array.isArray(books)) {
      books.sort(sortBy('title'))
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

        {/*
        conditional statement checks if an array of search results exists, and displays them.
        otherwise a message warning the user that their terms returned no matches is shown

        instead of typing out the list item again, we pass the book-object and changeShelf function
        to a child component, which then takes the values of the object keys and renders DOM elements
        */}
        {Array.isArray(books) ? (
          <div className="search-books-results">
            <ol className="books-grid">
            {books.map(book =>
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

SearchBooks.propTypes = {
  // verifies that the books prop is an array
  // and the changeShelf prop is a function
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default SearchBooks
