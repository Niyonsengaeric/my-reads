import React from "react";
import PropTypes from "prop-types";

class Reads extends React.Component {
  state = {};

  render() {
    const { read, onChangeBookState } = this.props;
    return (
      <div>
        {" "}
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            {read.length !== 0 && (
              <ol className="books-grid">
                {read.map((book) => (
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
                          >
                            <option value="move">Move to...</option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read" className="selected" selected ="selected">
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
Reads.propTypes = {
  read: PropTypes.array.isRequired,
  onChangeBookState: PropTypes.func.isRequired,
};

export default Reads;
