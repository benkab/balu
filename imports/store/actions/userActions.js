export function setAuth(auth) {
  return {
  	type: 'SETAUTH',
  	payload: {
  	  isAuth: !auth
  	}
  }
}

export function setUser(user) {
  return {
  	type: 'SETUSER',
  	payload: {
  	  user: user
  	}
  }
}

export function cancelUserEditMode(isEditingUser) {
  return {
    type: 'CANCELUSEREDITMODE',
    payload: {
      isEditingUser: false
    }
  }
}

export function toggleUserEditMode(isEditingUser) {
  return {
    type: 'TOGGLEUSEREDITMODE',
    payload: {
      isEditingUser: true
    }
  }
}

export function cancelUserDeleteMode(isDeleting) {
  return {
    type: 'CANCELUSEREDELETEMODE',
    payload: {
      isDeleting: false
    }
  }
}

export function toggleUserDeleteMode(isDeleting) {
  return {
    type: 'TOGGLEUSEREDELETEMODE',
    payload: {
      isDeleting: true
    }
  }
}
