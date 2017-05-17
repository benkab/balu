export function toggleMenuState(menuIsDiplayed) {
  return {
  	type: 'TOGGLEMENUSTATE',
  	payload: {
  	  menuIsDiplayed: !menuIsDiplayed.menuIsDiplayed
  	}
  }
}

export function closeMenuState(menuIsDiplayed) {
  return {
  	type: 'CLOSEMENUSTATE',
  	payload: {
  	  menuIsDiplayed: false
  	}
  }
}
