import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


  render() {
    const AllMessages = this.props.messages.map((message, index) => {
      switch(message.type) {
        case 'incomingMessage':
          return (<Message key={index} message={message} />);
          break;
        case 'incomingNotification':
          return (
            <div className='message system' key={index}>
              {message.content}
            </div>
          );
          break;
        default:
          throw new Error(`Unknown event type in MessageList: ${message.type}`);
      }
    });
    console.log("Rendering <MessageList/>");

    return (
      <main className="messages">
        {AllMessages}
      </main>
    )
  }
}
export default MessageList;