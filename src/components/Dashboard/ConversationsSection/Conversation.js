import { useEffect, useState } from "react";

const ta = require("time-ago/timeago");

export default function Conversation(props) {
  const lastMessage = props.details.messages[props.details.messages.length - 1];
  const [timeAgo, setTimeAgo] = useState("");
  if (lastMessage) {
    setInterval(() => {
      setTimeAgo(
        ta.ago(new Date(lastMessage.receiveTimeVal) - 1000, "twitter")
      );
    }, 10000);

    useEffect(() => {
      setTimeAgo(
        ta.ago(new Date(lastMessage.receiveTimeVal) - 1000, "twitter")
      );
    }, []);
  }

  return (
    <div
      className="text-start px-3 conversation-list-item"
      onClick={() => {
        props.setActiveConversation(props.i);
      }}
    >
      <div className="py-3 border-bottom">
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
          <div className="col-10 ">
            <div className="container px-1 d-flex justify-content-center h-100 align-items-start w-100 flex-column">
              <div className="px-2 w-100">
                <div className="container p-0">
                  <div className="row w-100 d-flex justify-content-between align-items-center">
                    <div className="col-auto">
                      <div className="fw-regular">{props.details.name}</div>
                    </div>
                    <div className="col-auto text-muted">{timeAgo}</div>
                  </div>
                </div>
                <div className="text-muted">
                  {lastMessage.from === props.session.uuid ? <b>You: </b> : ""}
                  {lastMessage.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
