const initialState = {
  parking : null,
  isEditingParking : false,
  isDeletingParking: false
}

export default parkingReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETPARKING": {
  	  state = {...state, parking: action.payload}
  	  break;
  	}
    case "CANCELPARKINGEDITMODE": {
      state = {...state, isEditingParking: action.payload}
      break;
    }
    case "TOGGLEPARKINGEDITMODE": {
      state = {...state, isEditingParking: action.payload}
      break;
    }
    case "TOGGLEPARKINGDELETEMODE": {
      state = {...state, isDeletingParking: action.payload}
      break;
    }
    case "CANCELPARKINGDELETEMODE": {
      state = {...state, isDeletingParking: action.payload}
      break;
    }
  }
 return state;
}