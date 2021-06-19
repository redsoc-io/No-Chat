import React from "react";
const io = require("socket.io-client");

export default class Chatframe extends React.Component {
  connection() {
    this.socket = io("/");
    this.socket.on("connection", (data) => {
      console.log(data);
    });
  }
  render() {
    return (
      <div className="col-8">
        <div className="container h-100 p-3">
          {this.props.idle && (
            <div className="idle h-100 d-flex justify-content-center align-items-center flex-column">
              <img
                src="/undraw/undraw_Messages_re_qy9x.svg"
                height="auto"
                width="60%"
              />
              <h4 className="p-5 text-muted">Select a conversation</h4>
            </div>
          )}
          <button onClick={() => this.connection()}>Connect</button>
        </div>
      </div>
    );
  }
}
