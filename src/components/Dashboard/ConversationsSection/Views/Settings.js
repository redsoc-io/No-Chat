import md5 from "md5";

import { SiGravatar } from "react-icons/si";

export default function Settings(props) {
  return (
    <div>
      <div className="container no-chat-settings">
        <div className="d-flex justify-content-center align-items-center flex-column py-4">
          <div className="image-holder rounded-circle">
            <img
              src={`https://www.gravatar.com/avatar/${md5(
                props.session.user.email
              )}?s=200`}
              height="200"
              width="200"
            />
            <div className="content d-flex justify-content-center align-items-center">
              <a
                href="https://gravatar.com"
                target="_blank"
                className="btn btn-info"
              >
                <SiGravatar /> Edit on gravatar
              </a>
            </div>
          </div>
          <div className="fs-3 fw-light text-three">
            {props.session.user.name}
          </div>
        </div>
      </div>
    </div>
  );
}
