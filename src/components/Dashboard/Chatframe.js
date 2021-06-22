import React from "react";
import { FaPaperPlane } from "react-icons/fa";

export default class Chatframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", messages: [] };
  }
  sendMessage() {
    const recipients = [this.props.conversation.uuid];
    const message = this.state.message;
    this.setState(
      {
        messages: [
          ...this.state.messages,
          { from: this.props.currentUserUid, message: message },
        ],
      },
      () => {
        this.props.socket.emit("send-message", { recipients, message });
      }
    );
  }

  componentDidMount() {
    this.props.socket.on("receive-message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
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
            <div className="bg-white h-100 d-flex justify-content-stretch align-items-stretch flex-column">
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
                </div>
              </div>
              <div className="bg-light w-100 p-3 h-100">
                <div className="messages container">
                  {this.state.messages.map(({ from, message }) => {
                    return (
                      <div className="row">
                        <div className="col-6">
                          {from === this.props.conversation.uuid && (
                            <div className="text-start bg-primary text-white rounded-pill d-block p-3">
                              {message}
                            </div>
                          )}
                        </div>
                        <div className="col-6">
                          {from === this.props.currentUserUid && (
                            <div className="text-end bg-primary text-white rounded-pill d-block p-3">
                              {message}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                    <div className="col-11">
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        onChange={({ target }) => {
                          this.setState({ message: target.value });
                        }}
                      ></textarea>
                    </div>
                    <div className="col-1">
                      <div className="container">
                        <button
                          className="send btn btn-primary"
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
