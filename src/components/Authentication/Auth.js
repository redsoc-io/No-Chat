import { FaKey } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/client";

import Dropzone from "react-dropzone";
import { useState } from "react";

export default function Auth() {
  const [error, setError] = useState(false);
  let fileReader;

  const handleFileRead = async (e) => {
    const content = fileReader.result;
    const signin = await signIn("credentials", {
      key: content,
      redirect: false,
    });
    if (!signIn.ok) setError(!signIn.ok);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  return (
    <div className="p-2 bg-dark rounded-3 w-100">
      <div className="p-5 w-100">
        <h1 className="fs-3 text-light">Continue with key</h1>
        <Dropzone
          onDrop={(acceptedFiles) => {
            handleFileChosen(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={`btn-group-vertical border w-100 shadow-sm cursor-pointer bg-light p-3 rounded-3 d-flex justify-content-center align-items-center ${
                isDragActive && "border-4 border-primary "
              } ${error && "border-4 border-danger "}`}
            >
              <section className="d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <input {...getInputProps()} />
                  <p className="text-muted">
                    Upload or drop your <FaKey /> here.
                  </p>
                  {error && (
                    <p className="text-danger">
                      There is an error with your key!
                    </p>
                  )}
                </div>
              </section>
            </div>
          )}
        </Dropzone>
        <p className="text-light py-3">
          or{" "}
          <Link href="/signup">
            <a className="text-link text-decoration-none">
              Sign-up for encrypted key
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
