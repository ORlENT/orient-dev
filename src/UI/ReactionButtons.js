import React, { Component } from "react";
import { Reaction } from "./Reaction";
import { connect } from "react-redux";
import { updateReaction } from "../store/actions";

class ReactionButtons extends Component {
  state = {
    cachedInfo: {},
    isDisabled: false,
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

  onClick = async (emoji, number) => {
    this.setState({ isDisabled: true });
    try {
      await this.props.updateReaction(emoji, this.props.id, number);
      this.updateReactionCachedInfo(emoji);
    } finally {
      this.setState({ isDisabled: false });
    }
  };

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
          flexWrap: "wrap",
        }}
      >
        {Object.keys(emojiMenu).map((index) => (
          <Reaction
            key={index}
            disabled={this.state.isDisabled}
            emoji={emojiMenu[index]}
            onClick={() => {
              this.onClick(emojiMenu[index], 1);
            }}
            undoClick={() => {
              this.onClick(emojiMenu[index], -1);
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
