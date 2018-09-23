import React from 'react';
import { View } from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {connect } from 'react-redux';

class AccountScreen extends React.Component {
  render() {

    return (
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center' }}>
        <Avatar
          size="xlarge"
          rounded
          source={{uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />

      <Text h4>{this.props.user.lastName + " " +this.props.user.firstName }</Text>
      <Text h4>{this.props.user.email}</Text>

    </View>
    );
  }
}

function mapStateToProps(state) {
  return { user:state.userData }
}

export default connect(
    mapStateToProps,
    null
)(AccountScreen);
