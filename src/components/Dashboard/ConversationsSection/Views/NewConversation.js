import React from "react";
import { FaDownload } from "react-icons/fa";
import Dropzone from "react-dropzone";

class NewConversation extends React.Component {
  handleFileChosen(file) {
    let fileReader;

    const handleFileRead = async (e) => {
      const content = fileReader.result;
      this.props.addConversation(content);
      this.props.changeView(-1);
    };

    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
  download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  render() {
    return (
      <div className="p-3 h-100 d-flex justify-content-center align-items-center flex-column">
        <Dropzone
          onDrop={(acceptedFiles) => {
            var name = acceptedFiles[0].name;
            const extension = name.substr(name.length - 7);
            if (extension === "ncc.txt") {
              this.handleFileChosen(acceptedFiles[0]);
            }
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`btn-group-vertical border-3 w-100 cursor-pointer bg-white p-3 d-flex justify-content-center align-items-center ${
                isDragActive ? " border border-primary" : "border"
              } h-100`}
            >
              <section className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <input {...getInputProps()} />
                  <p
                    className={`${
                      isDragActive ? "text-primary" : "text-muted"
                    } m-0 fw-bold`}
                  >
                    Drop a contact card here to start a conversation
                  </p>
                </div>
              </section>
            </div>
          )}
        </Dropzone>
        <div>
          <p className="fs-2 py-3 m-0 text-center text-one fw-bold">or</p>
        </div>
        <div className="bg-transparent border-2 p-3 text-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.download(
                `${this.props.session.user.name}-contact-card.ncc.txt`,
                this.props.session.uuid
              );
            }}
          >
            <FaDownload /> Download contact card
          </button>
        </div>
      </div>
    );
  }
}
export default NewConversation;
