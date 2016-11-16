import React from 'react';
var Validator = require('jsonschema').Validator;


export default class FormValidator {
  constructor() {
    let validator = new Validator();

    //test validation
    var numberSchema = {"type": "number"};
    this.numberValidate = function(param){
      console.log("testValiDation parameters " , param);
      console.log(validator.validate(param, numberSchema));
    }

    var registerSchema = {
        "id": "/registerSchema",
        "type": "object",
        "properties": {
            "userName": {
                "type": "string",
                minLength: 4,
                maxLength: 20
            },
            "password": {
              minLength: 4,
              maxLength: 20

            },
            "confirmPassword":{
              minLength: 4,
              maxLength: 20,
            } ,
            "email": {
                "type": "string",
                minLength: 4,
                maxLength: 20
            }
        },
        "required": ["userName", "password", "confirmPassword", "email"]

    };

    this.validateRegister = function(param){
      let validationResult = validator.validate(param, registerSchema)
      this.handleResult(validationResult);
    }

    //Handle the result of validation here
    this.handleResult = function(validationResult){
      console.log("handleResult " , validationResult);
      /*if validationResult.errors.length > 0 -> there was error inform user*/
      if (validationResult.errors.length > 0) {
          alert("Oops! \nThere was " + validationResult.errors.length + " error(s) while submitting your project:  \n" + validationResult.errors[0].stack)
      }
    }
  }
}
