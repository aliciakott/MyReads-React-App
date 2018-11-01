import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EachBook from './EachBook.js'

class ShowBooks extends Component {

  render() {
    // deconstructing the props
    let books = this.props.books
    books.sort(sortBy('title'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
              {/*
              instead of repeating the list items, .map() calls the child Component
              EachBook, sending it the object "book" and changeShelf function as props
              */}
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                    <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                  <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter((book) => book.shelf === 'read').map((book) => (
                  <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/*
        react-router-dom uses the URL to control the UI, instead of setting the state
        */}
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    )
  }
}

ShowBooks.propTypes = {
  // verifies that the books prop is an array
  // and the changeShelf prop is a function
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired
}

export default ShowBooks
