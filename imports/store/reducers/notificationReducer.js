const initialState = {
  notificationIsDiplayed : false
}

export default notificationReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "TOGGLENOTIFICATIONSTATE": {
  	  state = {...state, notificationIsDiplayed: action.payload}
  	  break;
  	}
  	case "CLOSENOTIFICATIONSTATE": {
  	  state = {...state, notificationIsDiplayed: action.payload}
  	  break;
  	}
  }
 return state;
}
