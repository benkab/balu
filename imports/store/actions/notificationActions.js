export function toggleNotificationState(notificationIsDiplayed) {
  return {
  	type: 'TOGGLENOTIFICATIONSTATE',
  	payload: {
  	  notificationIsDiplayed: !notificationIsDiplayed.notificationIsDiplayed
  	}
  }
}

export function closeNotificationState(notificationIsDiplayed) {
  return {
  	type: 'CLOSENOTIFICATIONSTATE',
  	payload: {
  	  notificationIsDiplayed: false
  	}
  }
}