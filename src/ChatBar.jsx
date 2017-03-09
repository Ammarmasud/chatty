import React, {Component} from 'react';

class ChatBar extends Component {
  handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      const name = document.getElementsByClassName('chatbar-username')[0].value;

      if (name !== this.props.currentUser.name) {
        this.props.newNotificationSent(name);
      };

      this.props.newMessageSent(
        name,
        event.target.value
      );
      event.target.value = '';
    }
  };

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser.name}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.handleKeyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;
