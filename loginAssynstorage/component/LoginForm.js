import React,{Component} from 'react';
import { View, Alert, AsyncStorage, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { Spinner, CardSection } from './common'

export default class LoginForm extends Component {
  constructor(){
    super();
      this.state = {
        email: null,
        username: null,
        password: null,
        error: '',
        loading: false
      }
  }

  async onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  userSignup() {
  if (this.state.username && this.state.password) {
    // localhost tidak akan bekerja, jadi kita harus punya alamt ip dengan ifconfig
    fetch("http://211.11.1.90:3001/users", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.onValueChange('id_token', responseData.id_token),
      Alert.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!"
      ),
      Actions.HomePage();
    })
    .done();
  }
}

userLogin() {
  if (this.state.username && this.state.password) {
    // localhost tidak akan bekerja, jadi kita harus punya alamt ip dengan ifconfig
    fetch("http://211.11.1.90:3001/sessions/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.onValueChange('id_token', responseData.id_token),
      Alert.alert(
        "Login Success!",
      ),
      Actions.HomePage();
    })
    .done();
  }
}

    render() {
        return (
          <View style={styles.constainerStyle}>
            <Text style={styles.textStyle}>Login Please</Text>
            <View>
                <FormLabel labelStyle={styles.labelStyles}>Email/Username</FormLabel>
                <FormInput
                  inputStyle = {styles.formInputStyle}
                  placeholder="Username"
                  placeholderTextColor= "grey"
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                />
            </View>
            <View>
              <FormLabel labelStyle={styles.labelStyles}>Password</FormLabel>
              <FormInput
                inputStyle = {styles.formInputStyle}
                secureTextEntry
                placeholder="password"
                placeholderTextColor= "grey"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <FormValidationMessage>
              {this.state.error.message}
            </FormValidationMessage>
            <CardSection>
              <Button
                buttonStyle = {styles.buttonStyle}
                borderRadius={20}
                backgroundColor= 'grey'
                icon={{name: 'account-circle', size: 30}}
                title= 'Sign In'
                onPress={this.userLogin.bind(this)}
              />
            </CardSection>
            <CardSection>
              <Button
                buttonStyle = {styles.buttonStyle}
                borderRadius={20}
                backgroundColor= 'grey'
                icon={{name: 'account-circle', size: 30}}
                title= 'Sign Up'
                onPress={this.userSignup.bind(this)}
              />
            </CardSection>
          </View>
        );
    }
}

const styles = {
  constainerStyle: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formInputStyle: {
    fontSize: 18,
    color: 'white',
  },
  labelStyles : {
    fontSize: 18,
    color: 'white',

  },
  buttonStyle: {
    width: 260,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: 30
  },
  textStyle: {
    fontSize: 25,
    color: 'yellow'
  }
}
