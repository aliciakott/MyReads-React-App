import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ShowBooks from './ShowBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    // this state will hold the response from BooksAPI.getAll method
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        // the array of objects get passed to the state
        this.setState({
          books: books
        })
      })
  }

  updateShelf = (book, event) => {
    let shelf = event.target.value
    let books = this.state.books
    let selectedBook = books.filter((b) => b.id === book.id)
    // first, a copy is made of the books displayed on the main page, then
    // selectedBook checks to see if the book is already on a bookshelf

    BooksAPI.update(book, shelf).then(() => {
      // if there is a match, that book's shelf gets updated to the selection
      if (selectedBook[0] !== undefined) {
        books.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return null
        })
      } else {
      // if there is not a match, the book (with selected shelf) is added to
      // the copy-array of books
        selectedBook = book
        selectedBook.shelf = shelf
        books.push(selectedBook)
      }
      // the state is then updated & page is re-rendered
      this.setState({
        books: books
      })
    })
  }

  // Main and search pages are displayed by passing the state of books and
  // the function updateShelf, as props to the children components 
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
