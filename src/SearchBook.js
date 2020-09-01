import React from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchBook extends React.Component {
  state = {
    books: [],
    query: "",
    currentlyReading: [],
    read: [],
    wantToRead: [],
  };
  async updateQuery(query) {
    this.setState(() => ({
      query: query.trim(),
    }));

    const searchResults = await BooksAPI.search(query);
    if (this.state.query !== "" && searchResults.length) {
      this.setState(() => ({
        books: searchResults,
      }));
    } else {
      this.setState({
        books: [],
      });
    }
  }

  async getBooksState() {
    const { currentlyReading, read, wantToRead } = await this.props.booksState;

    this.setState(() => ({
      currentlyReading: currentlyReading,
      read: read,
      wantToRead: wantToRead,
    }));
  }
  async componentDidMount() {
    this.getBooksState();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.booksState !== this.props.booksState) {
      this.getBooksState();
    }
  }
  render() {
    const { currentlyReading, read, wantToRead } = this.state;
    const { books } = this.state;
    const { onChangeBookState } = this.props;
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={this.props.goBack}>
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
              <div style={{ background: "#fff" }}>
                <div className="bookshelf-books">
                  {books.length !== 0 && (
                    <ol className="books-grid">
                      {books.map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div
                                className="book-cover"
                                style={{
                                  width: 128,
                                  height: 193,
                                  backgroundImage: `url(${book.imageLinks &&
                                    book.imageLinks.smallThumbnail})`,
                                }}
                              />
                              <div className="book-shelf-changer">
                                <select
                                  onChange={(e) =>
                                    onChangeBookState(book.id, e.target.value)
                                  }
                                >
                                  <option value="move">Move to...</option>
                                  <option
                                    value="currentlyReading"
                                    className={
                                      currentlyReading.find(
                                        (element) =>
                                          element.id === book.id &&
                                          element.shelf === "currentlyReading"
                                      ) && "selected"
                                    }
                                  >
                                    Currently Reading
                                  </option>
                                  <option
                                    value="wantToRead"
                                    className={
                                      wantToRead.find(
                                        (element) =>
                                          element.id === book.id &&
                                          element.shelf === "wantToRead"
                                      ) && "selected"
                                    }
                                  >
                                    Want to Read
                                  </option>
                                  <option
                                    value="read"
                                    className={
                                      read.find(
                                        (element) =>
                                          element.id === book.id &&
                                          element.shelf === "read"
                                      ) && "selected"
                                    }
                                  >
                                    Read
                                  </option>
                                  <option
                                    value="none"
                                    className={
                                      read.find(
                                        (element) => element.id === book.id
                                      ) || "selected"
                                    }
                                  >
                                    None
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                              {Array.isArray(book.authors)
                                ? book.authors.map((author, index) => {
                                    return (index ? ", " : "") + `${author} `;
                                  })
                                : book.authors}
                              <div className="book-title">{book.shelf}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid" />
          </div>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  booksState: PropTypes.object.isRequired,
  onChangeBookState: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default SearchBook;
