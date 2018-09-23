import HomeScreen from './HomeScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AccountScreen from './AccountScreen';
import CameraScreen from './CameraScreen';


import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';

var NavScreen = createBottomTabNavigator(
  {
    Account: AccountScreen,
    Camera: CameraScreen,
  }
  ,
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        var iconName;
        var outline = (focused)? '' : '-outline';
        if (navigation.state.routeName == 'Home') {
          iconName = 'ios-home';
        }  else if(navigation.state.routeName == 'Account'){
          iconName = 'ios-settings';
        }else if(navigation.state.routeName == 'Camera'){
          iconName = 'ios-camera';
        }


        return <Ionicons name={iconName+outline} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3498db',
      inactiveTintColor: 'gray',
    },
  }
);

export default createStackNavigator({
Home:HomeScreen,
SignIn:SignInScreen,
SignUp: SignUpScreen,
Nav:NavScreen
},
{
  headerMode: 'none'
}
);
