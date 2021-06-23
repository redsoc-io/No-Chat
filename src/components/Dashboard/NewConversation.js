import { withCookie } from "next-cookie";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Dropzone from "react-dropzone";

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
  handleFileChosen(file) {
    let fileReader;

    const handleFileRead = async (e) => {
      const content = fileReader.result;
      this.addConversation(content);
    };

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
  render() {
    return (
      <Dropzone
        onDrop={(acceptedFiles) => {
          this.handleFileChosen(acceptedFiles[0]);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={`btn-group-vertical border-1 w-100 cursor-pointer bg-white p-3 d-flex justify-content-center align-items-center ${
              isDragActive
                ? " border border-primary"
                : "border-bottom border-top"
            }`}
          >
            <section className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                <input {...getInputProps()} />
                <p
                  className={`${
                    isDragActive ? "text-primary" : "text-muted"
                  } m-0`}
                >
                  Drop contact card here to add a conversation
                </p>
              </div>
            </section>
          </div>
        )}
      </Dropzone>
    );
  }
}
export default NewConversation;
