import { withCookie } from "next-cookie";
import React from "react";
import { FaPlus } from "react-icons/fa";

class NewConversation extends React.Component {
  addConversation(e) {
    e.preventDefault();
    const conversationEmail = this.input.value;
    this.props.addConversation({ email: conversationEmail, name: "" });
    this.resetForm();
  }

  resetForm() {
    this.addConversationForm.reset();
  }
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center border-bottom">
        <form
          className="row g-3 py-2 pt-4"
          onSubmit={this.addConversation.bind(this)}
          ref={(addConversationForm) =>
            (this.addConversationForm = addConversationForm)
          }
          autoComplete="off"
        >
          <div className="col-auto">
            <label htmlFor="staticEmail2" className="visually-hidden">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="email@example.com"
              ref={(input) => (this.input = input)}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              <FaPlus /> Conversation
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default NewConversation;
