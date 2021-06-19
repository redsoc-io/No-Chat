import React from "react";
import Link from "next/link";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nname: "",
      email: "",
    };
  }
  download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async getKey() {
    const user = JSON.stringify({ ...this.state });
    const response = await fetch(`/api/genkey?string=${user}`, {
      method: "POST",
      body: JSON.stringify({ ...this.state }),
    });
    const key = await response.text();
    this.download("no-chat_key.key", key);
  }
  render() {
    const disabledPost = !(
      this.state.name &&
      this.state.nname &&
      this.state.email
    );
    return (
      <header className="container-fluid h-100 bg-dark header-holder">
        <div className="row h-100">
          <div className="col-6 d-flex justify-content-start align-items-center py-4">
            <div className="container p-5 flex-column d-flex justify-content-start align-items-start">
              <img src="/logo.png" alt="..." height="200" width="200" />
              <h1 className="text-light py-3">Signup</h1>
              <p className="text-muted">
                We'll give you a 256-bit encrypted key for login.
                <br /> Keep it safe.
              </p>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="container d-flex justify-content-center align-items-center w-100 h-100vh">
              <div className="d-flex justify-content-center flex-column align-items-start w-100  h-100 p-3">
                <form
                  className="w-100 bg-light p-3 shadow-lg rounded-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!disabledPost) this.getKey();
                  }}
                >
                  <div className="form-group py-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      onChange={({ target }) => {
                        this.setState({ name: target.value });
                      }}
                    />
                  </div>
                  <div className="form-group py-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Nickname"
                      onChange={({ target }) => {
                        this.setState({ nname: target.value });
                      }}
                    />
                  </div>
                  <div className="form-group py-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={({ target }) => {
                        this.setState({ email: target.value });
                      }}
                    />
                  </div>
                  <div className="form-group py-3">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={disabledPost}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <Link href="/" passHref>
                  <a className="text-decoration-none text-link py-3">
                    or Login
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
