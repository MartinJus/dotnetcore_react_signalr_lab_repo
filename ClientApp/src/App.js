import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Chat } from './components/Chat';
import { ProgressDemo } from "./components/ProgressDemo";

import connectSignalR from './signalrHandler';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  constructor(props) {
    super(props);
    let connection = connectSignalR();
    this.state = {
      signalRConnection: connection
    };
  }
  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        {/* TODO: Add route to send message with signalR */}
        <Route path='/chat' render={() => <Chat signalRConnection={this.state.signalRConnection} />} />
        <Route path='/progresstest' render={() => <ProgressDemo signalRConnection={this.state.signalRConnection} />} />
      </Layout>
    );
  }
}
