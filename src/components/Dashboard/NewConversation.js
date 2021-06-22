import { withCookie } from "next-cookie";
import React from "react";
import { FaPlus } from "react-icons/fa";

class NewConversation extends React.Component {
  async addConversation(uuid) {
    if (!this.checkIfConversationAlreadyPresent(uuid)) {
      const userProfile = await this.checkIfUserExists(uuid);
      console.log(userProfile);
      if (userProfile.exists) {
        this.props.addConversation({
          uuid,
          name: userProfile.name,
          image: userProfile.image,
        });
        this.resetForm();
      } else alert("User Doesn't Exist!");
    }
  }
  async checkIfUserExists(uuid) {
    const response = await fetch(`/api/checkUserExists`, {
      method: "POST",
      body: JSON.stringify({ string: uuid }),
    });
    const key = await response.json();
    return key;
  }
  componentDidMount() {
    this.props.socket.on("receive-message", (message) => {
      this.addConversation(message.from);
    });
  }
  checkIfConversationAlreadyPresent(uuid) {
    const filteredArray = this.props.conversations.filter((conv) => {
      return conv.uuid === uuid;
    });
    return filteredArray.length > 0;
  }
  resetForm() {
    this.addConversationForm.reset();
  }
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center border-bottom">
        <form
          className="row g-3 py-2 pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            this.addConversation(this.input.value);
          }}
          ref={(addConversationForm) =>
            (this.addConversationForm = addConversationForm)
          }
          autoComplete="off"
        >
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="User UUID"
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
