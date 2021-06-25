import React from "react";

export default class App_loading extends React.Component {
  render() {
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src="/logo.png" height="200" width="200" />
        <div className="p-3">
          <div className="spinner-border p-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}
