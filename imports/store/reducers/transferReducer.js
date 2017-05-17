const initialState = {
  transfer : null,
  isEditingTransfer : false,
  isDeletingTransfer: false,
  isPayingTransfer: false
}

export default transferReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETTRANSFER": {
  	  state = {...state, transfer: action.payload}
  	  break;
  	}
    case "CANCELTRANSFEREDITMODE": {
      state = {...state, isEditingTransfer: action.payload}
      break;
    }
    case "TOGGLETRANSFEREDITMODE": {
      state = {...state, isEditingTransfer: action.payload}
      break;
    }
    case "TOGGLETRANSFERDELETEMODE": {
      state = {...state, isDeletingTransfer: action.payload}
      break;
    }
    case "CANCELTRANSFERDELETEMODE": {
      state = {...state, isDeletingTransfer: action.payload}
      break;
    }
    case "TOGGLETRANSFERPAYEMENTMODE": {
      state = {...state, isPayingTransfer: action.payload}
      break;
    }
    case "CANCELTRANSFERPAYEMENTMODE": {
      state = {...state, isPayingTransfer: action.payload}
      break;
    }
  }
 return state;
}