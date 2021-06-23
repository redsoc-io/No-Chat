import { FaTrash } from "react-icons/fa";

export default function Conversation(props) {
  return (
    <div
      className="text-start px-3 conversation-list-item"
      onClick={() => {
        props.setActiveConversation(props.i);
      }}
    >
      <div className="border-bottom py-3">
        <div className="row">
          <div className="col-2">
            <div className="d-inline-block px-3">
              <img
                src={
                  props.details.image || "/undraw/undraw_profile_pic_ic5t.svg"
                }
                height="48"
                width="48"
                className="rounded-circle"
              />
            </div>
          </div>
          <div className="col-10">
            <div className="container px-1 d-flex justify-content-start h-100 align-items-center">
              <span className="fw-bold px-2">{props.details.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
