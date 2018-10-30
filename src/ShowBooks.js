import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EachBook from './EachBook.js'

class ShowBooks extends Component {

  render() {
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
                <ol className="books-grid">
                  {this.props.books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                    <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                  <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.filter((book) => book.shelf === 'read').map((book) => (
                  <EachBook book={book} changeShelf={this.props.changeShelf} key={book.id}/>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Link to="/search" className="open-search">
          Add a book
        </Link>
      </div>
    )
  }
}

export default ShowBooks
