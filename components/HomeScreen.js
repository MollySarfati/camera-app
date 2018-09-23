import React from 'react';
import { View, ImageBackground } from 'react-native';
import {Button, Text} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ImageBackground style={{flex:1}} source={require("../assets/camerja-homescreen.jpg")}>
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center' }}>
            <Text h2 style={{color: "#ffffff", marginBottom:"75%"}}>Camerja</Text>
            <Text h3 style={{color: "#ffffff"}}>Take awesome picture</Text>
            <Text h3 style={{color: "#ffffff"}}>now and everywhere</Text>

          <Button title="Sign In" style={{marginBottom:"5%"}}
              backgroundColor="#F4FDFA" color='black'
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
            <Button title="Sign Up" style={{marginBottom:"5%"}}   backgroundColor="#F4FDFA" color='black' onPress={() => this.props.navigation.navigate('SignUp')}/>
          </View>
      </ImageBackground>
    );
  }
}
