export function setParking(parking) {
  return {
  	type: 'SETPARKING',
  	payload: {
  	  parking: parking
  	}
  }
}

export function cancelParkingEditMode(isEditingParking) {
  return {
    type: 'CANCELPARKINGEDITMODE',
    payload: {
      isEditingParking: false
    }
  }
}

export function toggleParkingEditMode(isEditingParking) {
  return {
    type: 'TOGGLEPARKINGEDITMODE',
    payload: {
      isEditingParking: true
    }
  }
}

export function toggleParkingDeleteMode(isDeletingParking) {
  return {
    type: 'TOGGLEPARKINGDELETEMODE',
    payload: {
      isDeletingParking: true
    }
  }
}

export function cancelParkingDeleteMode(isDeletingParking) {
  return {
    type: 'CANCELPARKINGDELETEMODE',
    payload: {
      isDeletingParking: false
    }
  }
}


