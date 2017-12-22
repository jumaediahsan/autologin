import React, {Component} from 'react';
import {
	AsyncStorage,
	Alert,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { Button, SocialIcon } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {

  async userLogout() {
    try {
        await AsyncStorage.removeItem('id_token');
        Alert.alert("Logout Success!");
        Actions.Authentication();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }

    render() {
        return (
            <View style={styles.constainerStyle}>
							<Text style={styles.textStyle}> Anda sudah Masuk </Text>
							<Text style={styles.textSecond}> Silahkan Keluar </Text>
              <Button
                buttonStyle = {styles.buttonStyle}
                borderRadius={20}
                backgroundColor= 'grey'
                icon={{name: 'account-circle', size: 30}}
                title= 'Log Out'
                onPress={this.userLogout}
              />
            </View>
        );
    }
}

const styles = {
  constainerStyle : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
		color : 'blue',
		fontSize: 25

	},
	textSecond: {
		fontSize: 18,
		color: 'red'
	}
}
