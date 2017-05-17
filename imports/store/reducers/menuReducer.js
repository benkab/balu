const initialState = {
  menuIsDiplayed : false
}

export default menuReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "TOGGLEMENUSTATE": {
  	  state = {...state, menuIsDiplayed: action.payload}
  	  break;
  	}
  	case "CLOSEMENUSTATE": {
  	  state = {...state, menuIsDiplayed: action.payload}
  	  break;
  	}
  }
 return state;
}
