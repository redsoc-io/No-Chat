import React from "react";
import Chatframe from "./Chatframe";
import Conversatons from "./Conversations";

export default class content extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row g-0">
          <Conversatons conversations={this.props.conversations} />
          <Chatframe conversations={this.props.conversations} idle={true} />
        </div>
      </div>
    );
  }
}
