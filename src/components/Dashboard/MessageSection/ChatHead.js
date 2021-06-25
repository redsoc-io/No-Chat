import React from "react";

export default class ChatHead extends React.Component {
  render() {
    return (
      <div className="bg-light shadow-sm w-100 px-3 border-bottom d-flex align-items-center justify-content-stretch w-100 chat-head">
        <div className="row w-100">
          <div className="col-6">
            <img
              src={
                this.props.conversation.image ||
                "/undraw/undraw_profile_pic_ic5t.svg"
              }
              height="42"
              width="42"
              className="rounded-circle"
            />
            <span className="m-3 text-dark">
              {this.props.conversation.name || this.props.conversation.uuid}
            </span>
          </div>
          <div className="col-6">
            <div className="container d-flex justify-content-end align-items-center h-100 w-100">
              {/* <button
                className="btn btn-danger"
                onClick={() => {
                  this.props.deleteConversation(this.props.conversation.uuid);
                }}
              >
                <FaTrash /> Delete
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
