import React, {Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import { Spinner } from './common';
import LoginForm from './LoginForm';
import Home from './Home';

class App extends Component {

  constructor(){
    super();
    this.state = {
      hasToken: false,
      loading: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      if (token !== null){
        this.setState({
          hasToken: true,
          loading: true
        });
      } else{
        this.setState({
          hasToken: false,
          loading: true
        });
      }
    });
  }

  render() {
    if (!this.state.loading){
      return (
        <Spinner />
      )
    } else {
      return(
        <Router>
          <Scene key="root">
            <Scene
              component={LoginForm}
              hideNavBar={true}
              initial={!this.state.hasToken}
              key="Authentication"
              title="Authentication"
            />
            <Scene
              component={Home}
              hideNavBar={true}
              initial={this.state.hasToken}
              key="HomePage"
              title="Home Page"
            />
          </Scene>
        </Router>
      )
    }
  }
}

export default App;
