import React from 'react';
import { View } from 'react-native';
import {Button, FormLabel, FormInput} from 'react-native-elements';
import {connect } from 'react-redux';

class SignUpScreen extends React.Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {first_name : '',
                  last_name : '',
                  password : '',
                  mail : '',
                }
  }

  handleSubmit(){
    var ctx = this;

    this.props.handleUserValid(ctx.state.last_name, ctx.state.first_name, ctx.state.mail);

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `last_name=${this.state.last_name}&first_name=${this.state.first_name}&mail=${this.state.mail}&password=${this.state.password}`
    }).then((response) => {
      ctx.props.navigation.navigate('Account')
    }).catch(err => {
      console.log(err)
    })

  }




 render() {
   return (
     <View style={{flex:1,justifyContent: 'center',alignItems: 'center' }}>

       <FormLabel>First Name</FormLabel>
       <FormInput onChangeText={(text) => this.setState({first_name:text})}/>
       <FormLabel>Last Name</FormLabel>
       <FormInput onChangeText={(text) => this.setState({last_name:text})}/>
       <FormLabel>Email</FormLabel>
       <FormInput onChangeText={(text) => this.setState({mail:text})}/>
       <FormLabel>Password</FormLabel>
       <FormInput onChangeText={(text) => this.setState({password:text})}/>

       <Button
         title="Sign Up"
         backgroundColor="grey"  color='#edeeef' style={{margin:"5%"}}
         onPress={this.handleSubmit}
       />
     </View>
   );
 }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUserValid: function(nameUser, firstNameUser, emailUser) {
        dispatch( {type: 'setUser', lastName:nameUser, firstName:firstNameUser, email:emailUser} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(SignUpScreen);
