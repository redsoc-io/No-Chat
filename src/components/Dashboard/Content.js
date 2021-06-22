import React from "react";
import Chatframe from "./Chatframe";
import Conversatons from "./Conversations";
const io = require("socket.io-client");

export default class content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: "",
      mounted: false,
    };
    this.socket = "";
  }
  componentDidMount() {
    this.socket = io("/", {
      query: { user: this.props.session.uuid },
    });
    this.setState({ mounted: true });
  }
  setActiveConversation(conversation, id) {
    this.setState({ conversation });
  }
  render() {
    return (
      <div className="container-fluid p-0">
        {this.state.mounted && this.socket && (
          <div className="row g-0">
            <Conversatons
              conversations={this.props.conversations}
              setActiveConversation={this.setActiveConversation.bind(this)}
              socket={this.socket}
            />
            <Chatframe
              conversation={this.state.conversation}
              currentUserUid={this.props.session.uuid}
              socket={this.socket}
            />
          </div>
        )}
      </div>
    );
  }
}
