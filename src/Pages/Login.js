import React, { useState } from "react";
import axios from "axios";
import "../Styles/Login.css";

function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logAlert, setLogAlert] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [signUpView, setSignUpView] = useState(false);

  //signUp
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [signUpAlert, setSignUpAlert] = useState(false);

  async function loginUser(credentials) {
    return axios
      .post("https://libraryapily.herokuapp.com/users/login", credentials)
      .then((data) => {
        return data.data;
      })
      .catch((err) => false);
  }

  const signUpMethod = async () => {
    if (newEmail && newPassword && fullName) {
      const signUpData = {
        fullname: fullName,
        password: newPassword,
        email: newEmail,
        role: "user",
      };
      axios
        .post("https://libraryapily.herokuapp.com/signup", signUpData)
        .then((data) => {
          setSignUpAlert(true);
        })
        .catch((err) => setLogAlert(true));
    } else {
      setLogAlert(true);
    }
  };

  const handleSubmit = async (e) => {
    setLoadingPage(true);
    e.preventDefault();
    if (email && password) {
      const logData = await loginUser({
        email,
        password,
      });

      if (!logData) {
        setLoadingPage(false);
        setLogAlert(true);
      } else {
        const { token, user } = logData.obj;
        setToken(token, user);
      }
    } else {
      setLoadingPage(false);
      setLogAlert(true);
    }
  };
  return (
    <div className="login">
      {loadingPage && (
        <div className="loading-container">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      )}
      {logAlert && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>??????!</strong> ???????????? ???????????? ???? ?????? ???????????????? ???????? ???? ????????????
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setLogAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      {signUpAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>????</strong> ?????????????? ??????????
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setSignUpAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <img
        src="/Images/logo.png"
        className="login_logo img-respinsive"
        alt="Library Icon"
      />
      <div className="login__form">
        <img
          className="img-responsive"
          width="150"
          height="150"
          src={signUpView ? "/Images/signup.svg" : "/Images/icon.svg"}
          alt="Logo"
        />
        {signUpView ? (
          <React.Fragment>
            <h3 className="animate__animated animate__heartBeat">
              ?????????? ???????? ????????
            </h3>
            <div>
              <input
                className="animate__animated animate__pulse animate__delay-1s"
                placeholder="?????????? ????????"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <input
                className="animate__animated animate__pulse animate__delay-2s"
                type="email"
                placeholder="???????????? ????????????????????"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className={
                  newPassword.length <= 8
                    ? "redInputAlert animate__animated animate__pulse animate__delay-4s"
                    : "animate__animated animate__pulse animate__delay-4s"
                }
                type="password"
                placeholder="???????? ????????????"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button onClick={signUpMethod} type="submit">
              ??????????
            </button>
            <p onClick={() => setSignUpView(false)} className="signup">
              ?????????? ????????????
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="animate__animated animate__heartBeat">
              ?????????? ????????????
            </h3>
            <div>
              <input
                placeholder="???????????? ????????????????????"
                type="text"
                className="animate__animated animate__pulse animate__delay-1s"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="???????? ????????????"
                className="animate__animated animate__pulse animate__delay-2s"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit} type="submit">
              ?????????? ????????????
            </button>
            <p onClick={() => setSignUpView(true)} className="signup">
              ?????????? ???????? ????????
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Login;
