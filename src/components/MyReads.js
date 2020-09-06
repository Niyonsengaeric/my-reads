import React from "react";
import PropTypes from "prop-types";

class CurrentReads extends React.Component {
  state = {};

  render() {
    const { currentlyReading, onChangeBookState, status } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">
            {status === "currentlyReading"
              ? "Currently Reading"
              : status === "wantToRead"
              ? "Want to Read"
              : "Read"}
          </h2>
          <div className="bookshelf-books">
            {currentlyReading.length !== 0 && (
              <ol className="books-grid">
                {currentlyReading.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.smallThumbnail
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) =>
                              onChangeBookState(book.id, e.target.value)
                            }
                            value={status}
                          >
                            <option value="move">Move to...</option>
                            <option
                              value="currentlyReading"
                              className={
                                status === "currentlyReading" ? "selected" : ""
                              }
                            >
                              Currently Reading
                            </option>
                            <option
                              value="wantToRead"
                              className={
                                status === "wantToRead" ? "selected" : ""
                              }
                            >
                              Want to Read
                            </option>
                            <option
                              value="read"
                              className={status === "read" ? "selected" : ""}
                            >
                              Read
                            </option>
                            <option value="none">None</option>
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
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    );
  }
}
CurrentReads.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  onChangeBookState: PropTypes.func.isRequired,
};

export default CurrentReads;
