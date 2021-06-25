import React from "react";
import { MdMessage } from "react-icons/md";
import { IoMdOptions, IoMdPower } from "react-icons/io";
import { signOut } from "next-auth/client";

export default class Dashbar extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div
        style={{ height: 60 }}
        className="bg-light d-flex justify-content-stretch align-items-center w-100 border-bottom"
      >
        <div className="row w-100">
          <div className="col-7">
            <div className="container px-3 d-flex justify-content-stretch align-items-center h-100">
              <img
                className="rounded-circle"
                height="38"
                width="38"
                src={this.props.session.user.image}
              />
            </div>
          </div>
          <div className="col-5 text-end">
            <div className="container p-0 d-flex flex-row justify-content-end">
              <ActionButton
                icon={MdMessage}
                onClick={() => {
                  this.props.changeView(0);
                }}
              />
              <ActionButton
                icon={IoMdOptions}
                onClick={() => {
                  this.props.changeView(1);
                }}
              />
              <ActionButton
                icon={IoMdPower}
                onClick={() => {
                  signOut({ redirect: false });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ActionButton(props) {
  const Icon = props.icon;
  return (
    <button
      className="action-button btn btn-outline-transparent mx-1 btn-transparent text-muted rounded-circle fs-4"
      onClick={props.onClick}
    >
      <Icon />
    </button>
  );
}
