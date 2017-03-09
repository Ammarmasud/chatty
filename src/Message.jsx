import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");

    const color = {color: this.props.message.color};
    const messageText = this.props.message.content;

    const checkImg = (messageText) => {
      const rx = new RegExp(`https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)`);
      const img = messageText.match(rx);
      // console.log('img:', img);

      if (img) {
        return (
          <div><img src={img[0]} /></div>
        );
      };
    };

    return (
      <div className="message">
        <span className="message-username" style={color}>{this.props.message.username}</span>
        <span className="message-content">
          {messageText}
          {checkImg(messageText)}
        </span>
      </div>
    )
  }
}
export default Message;
