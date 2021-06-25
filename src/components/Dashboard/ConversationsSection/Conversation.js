export default function Conversation(props) {
  const lastMessage = props.details.messages[props.details.messages.length - 1];
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
            <div className="container px-1 d-flex justify-content-center h-100 align-items-start w-100 flex-column">
              <div className="px-2 w-100">
                <div className="container p-0">
                  <div className="row">
                    <div className="col-9">
                      <div className="fw-regular">{props.details.name}</div>
                    </div>
                    <div className="col-auto">
                      {lastMessage.receiveTimeVal
                        ? new Date(lastMessage.receiveTimeVal).toTimeString()
                        : ""}
                    </div>
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
