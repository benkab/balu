export function setBranch(branch) {
  return {
  	type: 'SETBRANCH',
  	payload: {
  	  branch: branch
  	}
  }
}

export function showBranch(branch) {
  return {
    type: 'SHOWBRANCH',
    payload: {
      editedBranch: branch
    }
  }
}

export function resetBranch() {
  return {
  	type: 'RESETBRANCH',
  	payload: {
  	  branch: []
  	}
  }
}

export function toggleEditMode(isEditing) {
  return {
    type: 'TOGGLEEDITMODE',
    payload: {
      isEditing: true
    }
  }
}

export function cancelEditMode(isEditing) {
  return {
    type: 'CANCELEDITMODE',
    payload: {
      isEditing: !isEditing
    }
  }
}
