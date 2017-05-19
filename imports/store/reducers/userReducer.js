const initialState = {
  isAuth : null,
  user : null,
  isEditingUser : false,
  isDeleting: false
}

export default userReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETAUTH": {
  	  state = {...state, isAuth: action.payload}
  	  break;
  	}
  	case "SETUSER": {
  	  state = {...state, user: action.payload}
  	  break;
  	}
    case "RESETUSER": {
      state = {...state, user: action.payload}
      break;
    }
    case "CANCELUSEREDITMODE": {
      state = {...state, isEditingUser: action.payload}
      break;
    }
    case "TOGGLEUSEREDITMODE": {
      state = {...state, isEditingUser: action.payload}
      break;
    }
    case "CANCELUSEREDELETEMODE": {
      state = {...state, isDeleting: action.payload}
      break;
    }
    case "TOGGLEUSEREDELETEMODE": {
      state = {...state, isDeleting: action.payload}
      break;
    }
  }
 return state;
}
 