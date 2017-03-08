import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {
    const AllMessages = this.props.messages.map((message, index) => <Message key={index} message={message} />);
    console.log("Rendering <MessageList/>");

    return (
      // <Message />
      <main className="messages">
        {AllMessages}

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    )
  }
}
export default MessageList;
