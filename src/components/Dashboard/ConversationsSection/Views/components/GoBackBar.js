import { FaArrowLeft } from "react-icons/fa";

export default function GoBackBar(props) {
  return (
    <div className="bg-four goback-bar d-flex align-items-center px-3 w-100 h-100">
      <div
        onClick={() => {
          props.changeView(-1);
        }}
        className="d-flex align-items-center h-100 cursor-pointer"
      >
        <button className="btn btn-outline-light border-2">
          <FaArrowLeft />
        </button>
        <div className="d-inline-block px-2 text-light fs-5 fw-bold">
          {props.title}
        </div>
      </div>
    </div>
  );
}
