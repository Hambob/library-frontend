import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../Styles/Home.css";

function Home() {
  const [addView, setAddView] = useState(false);
  const [books, setBooks] = useState([]);
  const [categories, setCateGories] = useState([]);
  const [viewBook, setViewBook] = useState(false);
  const [book, setBook] = useState({});
  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [bookCat, setBookCat] = useState();
  const [addedBookAlert, setAddedBookAlert] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://libraryapily.herokuapp.com/books?filter=${encodeURIComponent(
          JSON.stringify({
            include: [{ relation: "category" }, { relation: "user" }],
          })
        )}`
      )
      .then((data) => setBooks(data.data))
      .catch((err) => false);

    axios
      .get("https://libraryapily.herokuapp.com/categories")
      .then((data) => setCateGories(data.data))
      .catch((err) => false);
  }, [renderCount]);

  const fetchBook = (bookId) => {
    const relationObject = {
      include: [{ relation: "category" }, { relation: "usersThr" }],
    };
    axios
      .get(
        `https://libraryapily.herokuapp.com/books/${bookId}?filter=${encodeURIComponent(
          JSON.stringify(relationObject)
        )}`
      )
      .then((data) => {
        setBook({ ...data.data });
        setViewBook(true);
      })
      .catch((err) => false);
  };

  const addBookMetod = () => {
    if (bookAuthor && bookTitle && bookCat) {
      axios
        .post("https://libraryapily.herokuapp.com/books", {
          title: bookTitle,
          author: bookAuthor,
          categoryId: parseInt(bookCat, 10),
          avaliable: true,
        })
        .then((data) => {
          setAddView(false);
          setRenderCount(renderCount + 1);
        })
        .catch((err) => setAddedBookAlert(true));
    } else {
    }
  };

  const regBook = (bookId) => {
    axios
      .post("https://libraryapily.herokuapp.com/book-logs", {
        bookId,
        userId: parseInt(localStorage.getItem("id"), 10),
      })
      .then((data) => {
        alert("تمت الإستعارة بنجاح");
        setRenderCount(renderCount + 1);
      })
      .catch((err) => false);

    axios
      .patch(`https://libraryapily.herokuapp.com/books/${bookId}`, {
        userId: parseInt(localStorage.getItem("id"), 10),
      })
      .then((data) => true)
      .catch((err) => false);
  };

  return (
    <div className="home--container">
      {addedBookAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>تمت </strong> إضافة الكتاب
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setAddedBookAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {viewBook && (
        <div className="bookView">
          <span onClick={() => setViewBook(false)}>X</span>
          <div className="book-con">
            <div className="book-info">
              <img src="/Images/bookView.png" width="150" height="150" />
              <h4>{book.title}</h4>
              <p>{book.category.name}</p>
            </div>
          </div>
          <div className="book-log">
            <h4>سجل الكتاب</h4>
            <ul>
              {book.usersThr ? (
                book.usersThr.map((user) => <li>{user.fullname}</li>)
              ) : (
                <li>لا توجد بيانات</li>
              )}
            </ul>
          </div>
        </div>
      )}
      {addView && (
        <div className="addbook">
          <span onClick={() => setAddView(false)}>X</span>
          <input
            onChange={(e) => setBookTitle(e.target.value)}
            name="booktitle"
            placeholder="عنوان الكتاب"
          />
          <input
            onChange={(e) => setBookAuthor(e.target.value)}
            name="author"
            placeholder="الكاتب"
          />
          <select onChange={(e) => setBookCat(e.target.value)}>
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
          <button onClick={addBookMetod}>إضافة</button>
        </div>
      )}
      <div className="menu">
        <p
          onClick={() => {
            localStorage.clear();
            window.location.reload(true);
          }}
        >
          تسجيل الخروج
        </p>
      </div>

      <div className="books">
        {books.map((book) => (
          <div className="book-con">
            <img
              onClick={() => fetchBook(book.id)}
              src="/Images/bookView.png"
              width="150"
              height="150"
            />
            <h5>{book.title}</h5>
            <p>{book.category.name}</p>
            {book.user ? <p>المستعير: {book.user.fullname}</p> : null}
            <span className={book.avaliable ? "green" : "red"}>
              {book.avaliable ? "متاح" : "غير متاح"}
            </span>
            <button onClick={() => regBook(book.id)}>إستعارة</button>
          </div>
        ))}
      </div>

      <div onClick={() => setAddView(true)} className="addBookBtn">
        <p>+</p>
      </div>
    </div>
  );
}

export default Home;
