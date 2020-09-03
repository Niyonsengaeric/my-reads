import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import WantReads from "./components/WantReads";
import CurrentReads from "./components/CurrentReads";
import Reads from "./components/Reads";
import SearchBook from "./SearchBook";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
    this.getBooksState = this.getBooksState.bind(this);
    this.changeBookState = this.changeBookState.bind(this);
  }

  async getBooksState() {
    await BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
    this.setState((currentState) => ({
      currentlyReading: currentState.books.filter((b) => {
        return b.shelf === "currentlyReading";
      }),
      wantToRead: currentState.books.filter((b) => {
        return b.shelf === "wantToRead";
      }),
      read: currentState.books.filter((b) => {
        return b.shelf === "read";
      }),
    }));
  }
  componentDidMount() {
    this.getBooksState();
  }
  async changeBookState(bookId, shelf) {
    const book = await BooksAPI.get(bookId);
    await BooksAPI.update(book, shelf);
    this.getBooksState();
  }
  render() {
    const { currentlyReading, wantToRead, read,books } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBook
              onChangeBookState={this.changeBookState}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read}
              books={books}
              goBack={() => {
                history.push("/");
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>Manage My Reads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentReads
                    currentlyReading={currentlyReading}
                    onChangeBookState={this.changeBookState}
                  />
                  <WantReads
                    wantToRead={wantToRead}
                    onChangeBookState={this.changeBookState}
                  />
                  <Reads read={read} onChangeBookState={this.changeBookState} />
                </div>
              </div>
              <div className="open-search">
                <button
                  onClick={() => {
                    history.push("/search");
                  }}
                >
                  Add a book
                </button>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
