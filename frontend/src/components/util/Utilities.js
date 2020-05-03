class Utilities {
  createNewPlayerRequestJsonObject(stateObject) {
    return {
      firstName: stateObject.playerFirstName,
      middleName: stateObject.playerMiddleName,
      lastName: stateObject.playerLastName,
      createdBy: 'Phouthasak'
    };
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