import React from "react";
import Chatframe from "./Chatframe";
import Conversatons from "./Conversations";
const io = require("socket.io-client");
const localforage = require("localforage");

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.localforage = localforage;
    this.state = {
      activeIndex: parseInt(localStorage.getItem("activeConversationIndex")),
      mounted: false,
      conversations: [],
    };
  }
  async initConversationsDatabase() {
    this.localforage.config({
      driver: localforage.WEBSQL,
      name: "no-chat",
      version: 1.0,
      size: 104857600,
      storeName: "nc-27",
      description: "Client side database to store no-chat info",
    });
    try {
      const value = await this.localforage.getItem("conversations");
      this.setState({ conversations: typeof value === "object" ? value : [] });
    } catch (err) {
      console.log(err); // It's fine :)
    }
  }
  updateDatabase() {
    const value = [...this.state.conversations];
    this.localforage.setItem("conversations", value);
  }
  componentDidMount() {
    this.initConversationsDatabase();
    this.socket = io("/", {
      query: { user: this.props.session.uuid },
    });
    this.socket.on("receive-message", (message) => {
      this.handleIncomingMessage(message);
    });
    this.setState({ mounted: true });
  }
  setActiveConversation(index) {
    this.setState({ activeIndex: index });
    localStorage.setItem("activeConversationIndex", index);
  }
  async addConversation(uuid, receiveTimeVal, message) {
    const checkIfUserExists = async (uuid) => {
      const response = await fetch(`/api/checkUserExists`, {
        method: "POST",
        body: JSON.stringify({ string: uuid }),
      });
      const key = await response.json();
      return key;
    };
    const checkIfConversationAlreadyPresent = (uuid) => {
      return (
        this.state.conversations.filter((conv) => {
          return conv.uuid === uuid;
        }).length > 0
      );
    };
    if (!checkIfConversationAlreadyPresent(uuid)) {
      const userProfile = await checkIfUserExists(uuid);
      if (userProfile.exists) {
        this.setState({
          conversations: [
            ...this.state.conversations,
            {
              uuid,
              name: userProfile.name,
              image: userProfile.image,
              messages: message
                ? [{ from: uuid, message, receiveTimeVal }]
                : [],
            },
          ],
        });
      } else alert("User Doesn't Exist!");
    }
    this.updateDatabase();
  }
  handleIncomingMessage({ message, from, to, receiveTimeVal }) {
    const getIndexOfConversation = (uuid) => {
      for (var i = 0; i < this.state.conversations.length; i++) {
        const convId = this.state.conversations[i].uuid;
        if (convId === uuid) return i;
      }
      return null;
    };
    const fromMyself = from === this.props.session.uuid;
    const index = getIndexOfConversation(fromMyself ? to : from);
    if (index != null) {
      /* Conversation Already Present */
      this.addMessageToConversation(message, from, receiveTimeVal, index);
    } else {
      /* Add Conversation then add Message */
      this.addConversation(from, receiveTimeVal, message);
    }
  }
  addMessageToConversation(message, from, receiveTimeVal, index) {
    const newConversations = [...this.state.conversations];
    newConversations[index].messages = newConversations[index].messages
      ? newConversations[index].messages
      : [];
    newConversations[index].messages = [
      ...newConversations[index].messages,
      { from, message, receiveTimeVal },
    ];
    this.setState({ conversations: newConversations });
    this.updateDatabase();
  }
  deleteConversation(uuid) {
    const newConversations = [...this.state.conversations].filter((conv) => {
      return conv.uuid !== uuid;
    });
    this.setState({ conversations: newConversations, activeIndex: undefined });
    this.updateDatabase();
  }
  render() {
    return (
      <div className="container-fluid p-0">
        {this.state.mounted && this.socket && (
          <div className="row g-0">
            <Conversatons
              conversations={this.state.conversations}
              setActiveConversation={this.setActiveConversation.bind(this)}
              addConversation={this.addConversation.bind(this)}
              currentIndex={this.state.activeIndex}
            />
            <Chatframe
              conversation={this.state.conversations[this.state.activeIndex]}
              currentUserUid={this.props.session.uuid}
              addMessageToConversation={this.addMessageToConversation.bind(
                this
              )}
              currentIndex={this.state.activeIndex}
              socket={this.socket}
              deleteConversation={this.deleteConversation.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}
