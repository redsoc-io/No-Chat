import React from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

export default class Chatframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", messages: [] };
  }
  sendMessage() {
    console.log(this.props);
    const recipients = [this.props.conversation.uuid];
    const message = this.state.message;
    if (message && message !== "\n") {
      console.log(message);
      this.props.addMessageToConversation(
        message,
        this.props.currentUserUid,
        this.props.currentIndex
      );
      this.props.socket.emit("send-message", { recipients, message });
    }
    this.setState({ message: "" });
  }
  _handleKeyUp = (event) => {
    switch (event.keyCode) {
      case 13:
        this.sendMessage();
        break;
      default:
        break;
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyUp);
  }
  render() {
    return (
      <div className="col-md-12 col-lg-8">
        <div className="container h-100">
          {!this.props.conversation && (
            <div className="idle h-100 d-flex justify-content-center align-items-center flex-column">
              <img
                src="/undraw/undraw_Messages_re_qy9x.svg"
                height="auto"
                width="60%"
              />
              <h4 className="p-5 text-muted">Select a conversation</h4>
            </div>
          )}
          {this.props.conversation && (
            <div className="bg-white h-100 d-flex justify-content-stretch align-items-stretch flex-column chat-frame-holder">
              <div className="bg-info w-100 p-3">
                <div className="row">
                  <div className="col-6">
                    <img
                      src={
                        this.props.conversation.image ||
                        "/undraw/undraw_profile_pic_ic5t.svg"
                      }
                      height="48"
                      width="48"
                      className="rounded-circle"
                    />
                    <span className="m-3 text-dark fw-bold">
                      {this.props.conversation.name ||
                        this.props.conversation.uuid}
                    </span>
                  </div>
                  <div className="col-6">
                    <div className="container d-flex justify-content-end align-items-center h-100 w-100">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.props.deleteConversation(
                            this.props.conversation.uuid
                          );
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-light w-100 messages-holder p-2">
                <div className="messages container">
                  {(this.props.conversation.messages || []).map(
                    ({ from, message }, i) => {
                      return (
                        <Message
                          from={from}
                          message={message}
                          currentUserUid={this.props.currentUserUid}
                          key={this.props.currentUserUid + from + i}
                        />
                      );
                    }
                  )}
                </div>
              </div>
              <div className="bg-info w-100 p-3">
                <form
                  className="messages container"
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.sendMessage();
                  }}
                >
                  <div className="row g-1">
                    <div className="col-10">
                      <input
                        className="form-control"
                        placeholder="Message"
                        onChange={({ target }) => {
                          this.setState({ message: target.value });
                        }}
                        value={this.state.message}
                      />
                    </div>
                    <div className="col-2">
                      <div className="container">
                        <button
                          className="send btn btn-primary w-100"
                          disabled={!this.state.message}
                          type="submit"
                        >
                          <FaPaperPlane /> Send
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class Message extends React.Component {
  componentDidMount() {
    this.scrollIntoView();
  }
  scrollIntoView() {
    this.msg.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    const props = this.props;
    return (
      <div className="row" ref={(elem) => (this.msg = elem)}>
        <div className="col-6 left">
          {this.props.from !== this.props.currentUserUid && (
            <div className="text-start bg-primary text-white rounded-pill d-block p-3">
              {this.props.message}
            </div>
          )}
        </div>
        <div className="col-6 right">
          {this.props.from === this.props.currentUserUid && (
            <div className="text-end bg-primary text-white rounded-pill d-block p-3">
              {this.props.message}
            </div>
          )}
        </div>
      </div>
    );
  }
}
