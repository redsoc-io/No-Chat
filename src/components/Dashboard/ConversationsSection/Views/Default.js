import React from "react";
import Conversation from "../Conversation";
import Dashbar from "../Dashbar";

export default class Defaut extends React.Component {
  state = { searchQuery: "" };
  searchQueryChanged({ target }) {
    this.setState({ searchQuery: target.value });
  }
  render() {
    return (
      <>
        <Dashbar
          session={this.props.session}
          changeView={this.props.changeView}
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
                    currentIndex={this.props.currentIndex}
                    i={i}
                  />
                );
              })}
          </>
        )}
      </>
    );
  }
}
