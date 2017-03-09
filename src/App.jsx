import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      numOfClients: 1,
    };
  }

  scrollToBottom = () => {
    console.log('did it work?', document.getElementsByClassName('message'));
    const messages = document.getElementsByClassName('message');
    const node = messages[messages.length-1];
    if (node) {
      console.log(node);
      node.scrollIntoView({behavior: "smooth"});
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = () => {
      console.log('Connected to server!')
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'numOfClients') {
        let update;
        if (this.state.id) {
          update = {numOfClients: data.numOfClients};
        } else {
          update = {
            numOfClients: data.numOfClients, id: data.id};
        }
        this.setState(update);
      } else {
        const messages = this.state.messages.concat(data);
        this.setState({messages: messages});
      };

    };
  };

  newMessageSent = (username, messageText) => {
    const newMessage = {
      type: 'postMessage',
      clientId: this.state.id,
      username: username,
      content: messageText
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  newNotificationSent = (newName) => {
    const newNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${newName}.`
    };
    this.socket.send(JSON.stringify(newNotification));
    this.setState({currentUser: {name: newName}});
  };

  render() {
    console.log("Rendering <App/>");

    return (
      <div>
        <NavBar numOfClients={this.state.numOfClients} />
        <MessageList
          messages  = {this.state.messages}
        />
        <ChatBar
          currentUser         = {this.state.currentUser}
          newMessageSent      = {this.newMessageSent}
          newNotificationSent = {this.newNotificationSent}
        />
      </div>

    );
  }
}
export default App;
