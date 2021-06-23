import React from "react";
import NewConversation from "./NewConversation";
import Conversation from "./Conversation";

class Conversatons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "" };
  }
  searchQueryChanged({ target }) {
    this.setState({ searchQuery: target.value });
  }
  render() {
    return (
      <div className="col-lg-4 col-md-12 conversations-section border-end ">
        <NewConversation
          conversations={this.props.conversations}
          addConversation={this.props.addConversation.bind(this)}
          socket={this.props.socket}
        />
        {this.props.conversations.length === 0 && (
          <div className="text-center py-3">
            <p className="text-muted">No Conversations</p>
          </div>
        )}
        {this.props.conversations.length > 0 && (
          <>
            <div className="p-3 border-bottom bg-light">
              <input
                className="form-control rounded-pill outline-none"
                placeholder="Search Conversations by Name or Email"
                onChange={this.searchQueryChanged.bind(this)}
              />
            </div>
            {this.props.conversations
              .filter((val) => {
                return (
                  val.uuid.includes(this.state.searchQuery) ||
                  val.name.includes(this.state.searchQuery)
                );
              })
              .map((conv, i) => {
                return (
                  <Conversation
                    details={conv}
                    key={JSON.stringify(conv)}
                    setActiveConversation={this.props.setActiveConversation.bind(
                      this
                    )}
                    i={i}
                  />
                );
              })}
          </>
        )}
      </div>
    );
  }
}

export default Conversatons;
