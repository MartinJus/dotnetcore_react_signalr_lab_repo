import React, { Component } from 'react';
import { SendMessage } from './SendMessage';
import { Messages } from "./Messages";

export class Chat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    console.log("SignalR connection: ", props.signalRConnection);

    this.updateMessages = this.updateMessages.bind(this);
    props.signalRConnection && props.signalRConnection.on("ReceiveMessage", (message, time) => this.updateMessages(message, time));
  }

  updateMessages (message, time) {
    this.setState({
      messages: [...this.state.messages, {message: message, time: time}]
    });
  }

  render() {
    return (
      <>
        <h1>Chat</h1>
        <SendMessage />
        <Messages messages={this.state.messages} />
      </>
    );
  }
}
