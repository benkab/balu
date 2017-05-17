const initialState = {
  branch : {},
  editedBranch : {},
  isEditing : false
}

export default branchReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETBRANCH": {
  	  state = {...state, branch: action.payload}
  	  break;
  	}
    case "SHOWBRANCH": {
      state = {...state, editedBranch: action.payload}
      break;
    }
    case "TOGGLEEDITMODE": {
      state = {...state, isEditing: action.payload}
      break;
    }
    case "CANCELEDITMODE": {
      state = {...state, isEditing: action.payload}
      break;
    }
  }
 return state;
}
