import React, { Component } from 'react'
import { images } from '../../assets'
import firebase from 'firebase'
import './Home.css'
import { FIREBASE_CONFIG } from '../../utils/config'

export default class App extends Component {
  state = {
    message: ''
  }

  componentWillMount() {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  componentDidMount() {
    const callRoot = firebase.functions().httpsCallable('app');
    callRoot().then((res) => {
      const { data } = res
      if (data) this.setState({ message: data })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={images.logo} className="App-logo" alt="logo" />
          <h5 style={{ fontSize: '2em' }}>{this.state.message}</h5>
          <p>
            Edit <code>src/Home.js</code> and save to reload.
          </p>
          <br />
          <button className="btn btn-info">Send Email</button>
        </header>
      </div>
    );
  }
}
