import React, { Component } from 'react';

export class SendMessage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        inputValue: ""
     };
     
     this.onInputChanged = this.onInputChanged.bind(this);
     this.sendMessage = this.sendMessage.bind(this);

   }

   onInputChanged(e) {
    this.setState({
        inputValue: e.target.value
    });
   }

   async sendMessage() {
    const message = this.state.inputValue;
    await fetch('weatherforecast/sendSignalMessage/' + message);
    
    this.setState({
        inputValue: ""
    });
   }

  render() {
    return (
      <div>
        <p aria-live="polite">Message: </p>
        <input type="text" onChange={this.onInputChanged} value={this.state.inputValue} />
        <button className="btn btn-primary" onClick={this.sendMessage}>Send message</button>
      </div>
    );
  }
}
