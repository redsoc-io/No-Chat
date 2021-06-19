import React from "react";
import Head from "next/head";
import { FaUser, FaAsterisk, FaLock } from "react-icons/fa";
import Auth from "./Authentication/Auth";

export default class Header extends React.Component {
  render() {
    return (
      <header className="container-fluid bg-dark header-holder">
        <Head>
          <title>No-Chat</title>
        </Head>
        <div className="container">
          <div className="row">
            <div className="col col-lg-6 col-sm-12 col-md-12">
              <div className="container p-5">
                <div className="align-middle">
                  <img src="/logo.png" alt="..." height="200" width="200" />
                  <p className="display-1 fw-bold text-light py-5">
                    Anonymous <br /> private <br /> chat!
                  </p>
                  <a
                    className="text-muted text-decoration-none"
                    href="https://redsoc.io"
                  >
                    Made by redsoc
                  </a>
                </div>
              </div>
            </div>
            <div className="col col-lg-6 col-sm-12 col-md-12">
              <div className="w-100">
                <Auth />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
