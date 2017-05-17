export function setTransfer(transfer) {
  return {
  	type: 'SETTRANSFER',
  	payload: {
  	  transfer: transfer
  	}
  }
}

export function cancelTransferEditMode(isEditingTransfer) {
  return {
    type: 'CANCELTRANSFEREDITMODE',
    payload: {
      isEditingTransfer: false
    }
  }
}

export function toggleTransferEditMode(isEditingTransfer) {
  return {
    type: 'TOGGLETRANSFEREDITMODE',
    payload: {
      isEditingTransfer: true
    }
  }
}

export function toggleTransferDeleteMode(isDeletingTransfer) {
  return {
    type: 'TOGGLETRANSFERDELETEMODE',
    payload: {
      isDeletingTransfer: true
    }
  }
}

export function cancelTransferDeleteMode(isDeletingTransfer) {
  return {
    type: 'CANCELTRANSFERDELETEMODE',
    payload: {
      isDeletingTransfer: false
    }
  }
}

export function toggleTransferPayementMode(isPayingTransfer) {
  return {
    type: 'TOGGLETRANSFERPAYEMENTMODE',
    payload: {
      isPayingTransfer: true
    }
  }
}

export function cancelTransferPayementMode(isPayingTransfer) {
  return {
    type: 'CANCELTRANSFERPAYEMENTMODE',
    payload: {
      isPayingTransfer: false
    }
  }
}

