import React from "react";
import Content from "./Content";
import Head from "next/head";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Head>
          <title>Conversations</title>
        </Head>

        <Content session={this.props.session} />
      </>
    );
  }
}
