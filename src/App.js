import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  updateShelf = (book, event) => {
    let shelf = event.target.value
    let books = this.state.books

    let selectedBook = books.filter((b) => b.id === book.id)
    BooksAPI.update(book, shelf).then(() => {
      if (selectedBook[0] !== undefined) {
        books.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return null
        })
      } else {
        selectedBook = book
        selectedBook.shelf = shelf
        books.push(selectedBook)
      }
      this.setState({
        books: books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ShowBooks books={this.state.books} changeShelf={this.updateShelf} />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} changeShelf={this.updateShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
