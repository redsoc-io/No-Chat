import React from "react";
import { signOut } from "next-auth/client";
import {
  FaCopy,
  FaDownload,
  FaExternalLinkAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  componentDidMount() {
    console.log(this.props.session);
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
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="row w-100">
          <div className="col-6">
            <div className="container-fluid py-2">
              <div className="d-flex justify-content-start align-items-center">
                <a className="navbar-brand" href="#">
                  <img src="/logo.png" className="" height="40" width="40" />
                </a>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <h2 className="fw-light my-2 fs-4">Conversations</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end align-items-center">
              <div className="btn-group nav-prof-options">
                <button
                  className="btn btn-secondary btn-lg dropdown-toggle prof-top"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={this.props.session.user.image}
                    height="40"
                    widyh="40"
                    className="rounded-circle"
                  />
                  <div className="mx-2 my-3 fw-bold">
                    {this.props.session.user.name}
                  </div>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="btn btn-primary w-100"
                      href="https://www.gravatar.com/"
                      target="_blank"
                    >
                      <FaExternalLinkAlt /> Change Avatar
                    </a>
                  </li>
                  <li>
                    <button
                      className={`btn btn-info w-100`}
                      onClick={() => {
                        this.download(
                          `${this.props.session.user.name.trim()}-no-chat.ncc`.toLowerCase(),
                          this.props.session.uuid
                        );
                      }}
                    >
                      <FaDownload /> Contact Card
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-danger w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        signOut({ redirect: false, callbackUrl: "/" });
                      }}
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
