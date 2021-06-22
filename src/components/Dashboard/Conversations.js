import React from "react";
import NewConversation from "./NewConversation";
import { useCookie, withCookie } from "next-cookie";
import Conversation from "./Conversation";

class Conversatons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "", conversations: this.props.conversations };
    this.cookie = useCookie(this.props.cookie);
  }
  searchQueryChanged({ target }) {
    this.setState({ searchQuery: target.value });
  }
  addConversation(details) {
    if (details)
      this.setState({ conversations: [...this.state.conversations, details] });
  }
  componentDidUpdate(prevS) {
    if (prevS.conversations !== this.state.conversations) {
      this.cookie.set("conversations", [...this.state.conversations]);
    }
  }
  render() {
    return (
      <div className="col-lg-4 col-md-12 conversations-section border-end ">
        <NewConversation
          conversations={this.state.conversations}
          addConversation={this.addConversation.bind(this)}
          socket={this.props.socket}
        />
        {this.state.conversations.length === 0 && (
          <div className="text-center py-3">
            <p className="text-muted">No Conversations</p>
          </div>
        )}
        {this.state.conversations.length > 0 && (
          <>
            <div className="border-bottom">
              <input
                className="form-control rounded-0 border-0 outline-none"
                placeholder="Search Conversations by Name or Email"
                onChange={this.searchQueryChanged.bind(this)}
              />
            </div>
            {this.state.conversations
              .filter((val) => {
                return (
                  val.uuid.includes(this.state.searchQuery) ||
                  val.name.includes(this.state.searchQuery)
                );
              })
              .map((conv) => {
                return (
                  <div
                    className="text-start px-3 conversation"
                    onClick={() => {
                      this.props.setActiveConversation(conv);
                    }}
                    key={JSON.stringify(conv)}
                  >
                    <Conversation details={conv} />
                  </div>
                );
              })}
          </>
        )}
      </div>
    );
  }
}

export default withCookie(Conversatons);
