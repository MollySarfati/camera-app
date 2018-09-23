import React from 'react';
import { View } from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import {connect } from 'react-redux';

class SignInScreen extends React.Component {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {password : '',
                  mail : '',
                  eMessage:false,
                }
  }

   handleSubmit = () => {
     var ctx = this;
     fetch('http://localhost:3000/signin?mail='+this.state.mail+'&password='+this.state.password
     )
     .then((resp) => resp.json())
     .then((data) => {
       if (data.UserExist) {
          ctx.props.handleUserValid(data.firstName, data.lastName, ctx.state.mail);
         ctx.props.navigation.navigate('Account')
       } else {
         ctx.setState({eMessage:true})
       }
     })
     .catch(err => {
       console.log(err)
     })
   }

 render() {
   console.log(this.state.eMessage)
   return (
     <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

       <Text h2 style={{color: "#152A58", marginBottom:"30%"}}>Welcome Back !</Text>

         <FormLabel>Email</FormLabel>
         <FormInput onChangeText={(text) => this.setState({mail:text})}/>
         <FormLabel>Password</FormLabel>
         <FormInput onChangeText={(text) => this.setState({password:text})}/>
         {!this.state.eMessage ?
           <View></View> : <FormValidationMessage>Une erreur d'identification à eu lieu</FormValidationMessage>}

         <Button style={{margin:"5%"}}
           title ="Sign In" color='white'
           backgroundColor="#152A58"
           onPress={this.handleSubmit}
         />

         <Text style={{ marginTop:'25%', marginBottom:"5%"}}>If you don't have an account yet, Sign Up now ! </Text>
         <Button title="Sign Up"  color='white' backgroundColor="grey" onPress={() => this.props.navigation.navigate('SignUp')}/>

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
)(SignInScreen);
