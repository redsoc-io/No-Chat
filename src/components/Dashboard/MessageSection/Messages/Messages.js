import React from "react";
import Message from "./Message";

export default class Messages extends React.Component {
  render() {
    return (
      <div className="bg-white w-100 messages-holder py-2 px-0">
        <div className="messages container p-0">
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
    );
  }
}
