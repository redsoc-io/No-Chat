import React from "react";
import { FaPaperPlane, FaTrash } from "react-icons/fa";

export default class Chatframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", messages: [] };
  }
  sendMessage() {
    const recipient = this.props.conversation.uuid;
    const message = this.state.message;
    if (message && message !== "\n") {
      this.props.socket.emit("send-message", { recipient, message });
    }
    this.setState({ message: "" });
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
                  {(this.props.conversation.messages || [])
                    .sort((a, b) => {
                      if (b.receiveTimeVal > a.receiveTimeVal) {
                        return -1;
                      }
                      return 1;
                    })
                    .map(({ from, message }, i) => {
                      return (
                        <Message
                          from={from}
                          message={message}
                          currentUserUid={this.props.currentUserUid}
                          key={this.props.currentUserUid + from + i}
                        />
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

import { motion, AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        <div className="row" ref={(elem) => (this.msg = elem)}>
          <div className="col-6 left">
            {this.props.from !== this.props.currentUserUid && (
              <motion.div
                className="text-start bg-primary text-white rounded-10 d-block py-2 px-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{}}
              >
                {this.props.message}
              </motion.div>
            )}
          </div>
          <div className="col-6 right">
            {this.props.from === this.props.currentUserUid && (
              <motion.div
                className="text-end bg-primary text-white rounded-10 d-block py-2 px-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.0,
                  },
                }}
              >
                {this.props.message}
              </motion.div>
            )}
          </div>
        </div>
      </AnimatePresence>
    );
  }
}
