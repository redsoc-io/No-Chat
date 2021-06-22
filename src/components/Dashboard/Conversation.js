export default function Conversation(props) {
  return (
    <div className="border-bottom py-3">
      <div className="d-inline-block px-3">
        <img
          src={props.details.image || "/undraw/undraw_profile_pic_ic5t.svg"}
          height="48"
          width="48"
          className="rounded-circle"
        />
      </div>
      <span className="fw-bold">{props.details.name}</span>
    </div>
  );
}
