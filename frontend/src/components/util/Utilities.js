class Utilities {
  createNewPlayerRequestJsonObject(stateObject) {
    return {
      firstName: stateObject.playerFirstName,
      middleName: stateObject.playerMiddleName,
      lastName: stateObject.playerLastName,
      createdBy: 'Phouthasak'
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
}

export default new Utilities();