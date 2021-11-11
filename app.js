"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = recursiveTraitSearch(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  let displayOption;
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  if (person.length == 1){
    displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  }

  

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person);
      break;
    case "family":
    // TODO: get person's family
    displayPersonFamily(person,people);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayPersonDescendants(person,people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 


//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let possibleColors = ["brown","blue","black","hazel","green"]
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  for (let i = 0; i < 5; i++){
    if (eyeColor !== possibleColors[i]){
      recursiveTraitSearch(people);
    }

  }

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }else{
      return false;
    }
  })
  return foundPerson;
}

function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid);
  if (gender !== "male" && gender !== "female"){
    recursiveTraitSearch(people)
  }
  
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }else{
      return false;
    }
  })
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's height?",autoValid);
  if(typeof height !== 'number' ){
    recursiveTraitSearch(people)
  }

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.height == height){
      return true;
    }else{
      return false;
    }
  })
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight?", autoValid);
  if(typeof weight !== 'number' ){
    recursiveTraitSearch(people)
  }

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.weight == weight){
      return true;
    }else{
      return false;
    }
  })
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", autoValid);
  let possibleJobs= ["programmer", "assistant", "landscaper","nurse","student", "doctor", "architect", "politician",]
  for (let i = 0; i < 8; i++){
    if (occupation !== possibleJobs[i]){
      recursiveTraitSearch(people);
    }
  }
  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }else{
      return false;
    }
  })
  return foundPerson;
}

//TODO: add other trait filter functions here.



//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " +person[0].height + "\n";
  personInfo += "Weight: " +person[0].weight + "\n";
  personInfo += "Date of Birth: " +person[0].dob + "\n";
  personInfo += "Occupation: " +person[0].occupation + "\n";
  personInfo += "Eye Color: " +person[0].eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function displayPersonFamily(person, people){
  let family = people
  family = people.filter(function(potentialMatch){
    if(potentialMatch.parents[0] === person[0].parents[0] && potentialMatch.parents.length > 0){
        if (potentialMatch.id === person[0].id){
          return false;
        }else{
          return true;
        }
    }else{
      if (potentialMatch.currentSpouse === person[0].id){
        return true;
      }
      else if (potentialMatch.firstName === person[0].firstName){
        if(potentialMatch.id === person[0].id){
          return false;
        }else{
          return true;
        }
      }
      else if (person[0].parents[0] === potentialMatch.id){
        return true;
      }
      else if (person[0].parents[1] === potentialMatch.id){
        return true;
      }else{
        return false;
      }
    }
  })
  displayPeople(family);
}


function displayPersonDescendants(person, people){
  let descendants = people
  descendants = people.filter(function(potentialMatch){
    if (potentialMatch.parents[0] === person[0].id || potentialMatch.parents[1] === person[0].id){
      if(potentialMatch.id === person[0].id){
        return false;
      }else{
      return true;
      }
    }
  })
  displayPeople(descendants);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}


// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  pass
  
}

//#endregion

function recursiveTraitSearch(mm,people){
  let masterMatches = mm  //array of objects
  
  //basecase
  if (masterMatches.length == 1){
    return masterMatches;
  }

  //recursive
 
  let userInput;
  while(userInput != "6"){
    displayPeople(masterMatches);
    userInput = prompt("What trait do you want to search for? \n 1. Height \n 2. Weight \n 3. Occupation \n 4. Eye Color \n 5. Gender \n 6. for Done");
    switch (userInput){
      case "1": 
        masterMatches = searchByHeight(masterMatches);
        break;
      case "2":
      masterMatches = searchByWeight(masterMatches);
        break;
      case "3":
      masterMatches = searchByOccupation(masterMatches);
        break;
      case "4":
      masterMatches = searchByEyeColor(masterMatches);  
        break;
      case "5":
      masterMatches = searchByGender(masterMatches);
        break;
    
      default:
        break;
    }

  }
  return masterMatches
}
