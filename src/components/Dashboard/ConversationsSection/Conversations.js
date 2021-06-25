import React from "react";
import NewConversation from "./Views/NewConversation";
import { AnimatePresence, motion } from "framer-motion";

/* Views */
import Default from "./Views/Default";
import GoBackBar from "./Views/components/GoBackBar";
import Settings from "./Views/Settings";

export default class Conversatons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: -1 };
  }
  changeView(n) {
    this.setState({ active: n });
  }
  render() {
    const ActiveElement = [
      {
        title: "New Conversation",
        component: (
          <NewConversation
            addConversation={this.props.addConversation}
            changeView={this.changeView.bind(this)}
            session={this.props.session}
          />
        ),
      },
      {
        title: "Settings",
        component: <Settings session={this.props.session} />,
      },
    ][this.state.active];
    return (
      <div className="col-lg-4 col-md-12 conversations-section border-end h-100vh position-relative">
        <Default
          conversations={this.props.conversations}
          setActiveConversation={this.props.setActiveConversation}
          session={this.props.session}
          changeView={this.changeView.bind(this)}
        />
        <AnimatePresence exitBeforeEnter>
          {this.state.active !== -1 && ActiveElement.title && (
            <motion.div
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={this.state.active}
              className="conv-section-view w-100"
            >
              <GoBackBar
                changeView={this.changeView.bind(this)}
                title={ActiveElement.title}
              />
              <div className="container view-content p justify-content-center align-items-center">
                {ActiveElement.component}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

const viewVariants = {
  initial: {
    x: "-100%",
  },
  exit: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};
