import React from "react";

import Emojis from "./Emojis";
import { FaPaperPlane } from "react-icons/fa";

export default class Messaging extends React.Component {
  state = { message: "" };
  sendMessage() {
    const recipient = this.props.conversation.uuid;
    const message = this.state.message;
    if (message) {
      this.props.socket.emit("send-message", { recipient, message });
    }
    this.setState({ message: "" });
  }
  render() {
    return (
      <div className="bg-light bg-gradient w-100 p-2 border-top messaging">
        <form
          className="messages container"
          onSubmit={(e) => {
            e.preventDefault();
            this.sendMessage();
          }}
        >
          <div className="row g-1">
            <div className="col-1">
              <Emojis
                addEmoji={(emoji) => {
                  this.setState({ message: this.state.message + " " + emoji });
                }}
              />
            </div>
            <div className="col-9 col-md-10">
              <input
                className="form-control rounded-pill shadow-none"
                placeholder="Message"
                onChange={({ target }) => {
                  this.setState({ message: target.value });
                }}
                onKeyDown={({ key }) => {
                  if (key == "Enter") {
                    this.sendMessage();
                  }
                }}
                value={this.state.message}
              />
            </div>
            <div className="col-2 col-md-1">
              <div className="container">
                <button
                  className="send btn btn-primary w-100"
                  disabled={!this.state.message}
                  type="submit"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
