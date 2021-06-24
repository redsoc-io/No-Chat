import { withCookie } from "next-cookie";
import React from "react";
import { FaPlus } from "react-icons/fa";
import Dropzone from "react-dropzone";

class NewConversation extends React.Component {
  handleFileChosen(file) {
    let fileReader;

    const handleFileRead = async (e) => {
      const content = fileReader.result;
      this.props.addConversation(content);
    };

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
  render() {
    return (
      <Dropzone
        onDrop={(acceptedFiles) => {
          var name = acceptedFiles[0].name;
          const extension = name.substr(name.length - 3);
          if (extension === "ncc") {
            this.handleFileChosen(acceptedFiles[0]);
          }
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
