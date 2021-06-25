import React from "react";
import ChatHead from "./ChatHead";
import Messages from "./Messages/Messages";
import Messaging from "./Messaging";

export default class Chatframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
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
              <ChatHead conversation={this.props.conversation} />
              <Messages
                conversation={this.props.conversation}
                currentUserUid={this.props.currentUserUid}
              />
              <Messaging
                socket={this.props.socket}
                conversation={this.props.conversation}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
