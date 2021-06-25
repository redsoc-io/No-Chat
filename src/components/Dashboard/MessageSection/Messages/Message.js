import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default class Message extends React.Component {
  componentDidMount() {
    this.scrollIntoView();
  }
  scrollIntoView() {
    this.msg.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    const props = this.props;
    return (
      <AnimatePresence>
        <div className="row" ref={(elem) => (this.msg = elem)}>
          <div className="col-6 left">
            {this.props.from !== this.props.currentUserUid && (
              <MessageUnit message={this.props.message} />
            )}
          </div>
          <div className="col-6 right">
            {this.props.from === this.props.currentUserUid && (
              <MessageUnit message={this.props.message} />
            )}
          </div>
        </div>
      </AnimatePresence>
    );
  }
}

function MessageUnit(props) {
  return (
    <motion.div
      className="text-end bg-secondary text-light rounded-10 d-block py-2 my-2 px-3 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.0,
        },
      }}
    >
      {props.message}
    </motion.div>
  );
}
