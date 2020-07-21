import React, { Component } from "react";
import { Reaction } from "./Reaction";
import { connect } from "react-redux";
import { updateReaction } from "../store/actions";

class ReactionButtons extends Component {
  state = {
    cachedInfo: {},
  };

  componentDidMount() {
    this.getReactionCachedInfo();
  }

  // Get the reaction cached
  getReactionCachedInfo() {
    var cachedInfo = JSON.parse(sessionStorage.getItem(this.props.collection));
    if (!cachedInfo) cachedInfo = {};
    this.setState({ cachedInfo });
  }

  // Update the reaction
  updateReactionCachedInfo(emoji) {
    var cachedInfo = JSON.parse(sessionStorage.getItem(this.props.collection));
    if (!cachedInfo) {
      cachedInfo = {};
    }
    // Toggle false or true in local storage
    cachedInfo[this.props.id].reactions[`${emoji}`] = !cachedInfo[this.props.id]
      .reactions[`${emoji}`];
    sessionStorage.setItem(this.props.collection, JSON.stringify(cachedInfo));
    this.getReactionCachedInfo();
  }

  render() {
    const { info } = this.props;
    const emojiMenu = {
      "0": "👍",
      "1": "😀",
      "2": "😍",
      "3": "😰",
      "4": "😩",
      "5": "😡",
    };
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {Object.keys(emojiMenu).map((index) => (
          <Reaction
            key={index}
            emoji={emojiMenu[index]}
            onClick={() => {
              this.props.updateReaction(emojiMenu[index], this.props.id, 1);
              this.updateReactionCachedInfo(emojiMenu[index]);
            }}
            undoClick={() => {
              this.props.updateReaction(emojiMenu[index], this.props.id, -1);
              this.updateReactionCachedInfo(emojiMenu[index]);
            }}
            active={
              this.state.cachedInfo[this.props.id]
                ? this.state.cachedInfo[this.props.id].reactions[
                    emojiMenu[index]
                  ]
                : false
            }
            count={info[emojiMenu[index]] ? info[emojiMenu[index]] : 0}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateReaction: (emoji, id, number) =>
      dispatch(updateReaction(emoji, id, number)),
  };
};

export default connect(null, mapDispatchToProps)(ReactionButtons);
