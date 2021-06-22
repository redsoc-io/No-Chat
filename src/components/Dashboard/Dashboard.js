import React from "react";
import Content from "./Content";
import Nav from "./Nav";
import Head from "next/head";
export default class Dashboard extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Conversations</title>
        </Head>
        <Nav session={this.props.session} />
        <Content
          conversations={this.props.conversations}
          session={this.props.session}
        />
      </>
    );
  }
}
