class Utilities {
  createNewPlayerRequestJsonObject(stateObject) {
    return {
      firstName: stateObject.playerFirstName,
      middleName: stateObject.playerMiddleName,
      lastName: stateObject.playerLastName,
      createdBy: 'Phouthasak'
    };
  }

  createDeleteEventRequestJsonObject(eventId) {
    return {
      eventId: eventId,
      deletedBy: 'Phouthasak'
    };
  }

  createNewEventRequestJsonObject(stateObject) {
    const formData = new FormData();
    formData.append('locationId', stateObject.location.locationId);
    formData.append('courtNumber', stateObject.courtNumber);
    formData.append('eventTime', stateObject.date);
    formData.append('scheduled', stateObject.scheduled.toString());

    if (stateObject.scheduled) {
      formData.append('permit', stateObject.permit);
      formData.append('permitFileName', stateObject.permitFileName);
    }

    formData.append('hostId', stateObject.host.playerId);
    return formData;
  }

  notNullOrEmpty(input) {
    if (input === null || input.toString().trim().length < 1) {
      return false;
    } else {
      return true;
    }
  }

  eventResponseToStateObject(response) {
    const eventDate = new Date(response.event.eventDateTime);
    const month = eventDate.getMonth() + 1;
    const day = eventDate.getDate();
    const year = eventDate.getFullYear();
    const hour = eventDate.getHours();
    const minutes = eventDate.getMinutes();
    const finalString = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes;

    return {
      eventId: response.event.eventId,
      locationName: response.event.location.locationName,
      courtNumber: response.event.courtNumber,
      eventDateTime: finalString,
      scheduled: (response.event.scheduled ? 'Yes' : 'No'),
      hostName: response.event.player.firstName+ " " + response.event.player.lastName,
    };
  }

  createCheckInJsonRequestObject(stateObject) {
    const currentDate = new Date();
    return {
      'checkInBy': 'Phouthasak',
      'eventId': stateObject.originalEvent.eventId,
      'playerCheckIns': stateObject.playerEditList,
      'nonPlayerCheckIns': stateObject.nonPlayerEditList,
      'checkInDate': currentDate
    };
  }
}

export default new Utilities();