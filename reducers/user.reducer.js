export default function(user = {}, action) {
  if(action.type == 'setUser') {
       var userCopy = {lastName: action.lastName, firstName:action.firstName, email:action.email}
      return userCopy;
  } else{
    return user;
  }
}
