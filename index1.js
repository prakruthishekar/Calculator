'use strict';

//import ask-sdk-core
const Alexa = require('ask-sdk-core');

//skill name
const appName = 'My Calculator';

//code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        //welcome message
        let speechText = 'Welcome to My Calculator. You can say, add 2 and 5, or multiply 4 and 8.';
        //welcome screen message
        let displayText = "Welcome to My Calculator"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

//implement custom handlers
const addIntentHandler={
  canHandle(handlerInput){
    return handlerInput.requestEnvelope.request.type==='IntentRequest'&&
    handlerInput.requestEnvelope.request.intent.name==='addintent'
  },
  handle(handlerInput){
    let speechText='';
    let displayText='';
    let intent=handlerInput.requestEnvelope.request.intent;
    let firstnumber=intent.slots.firstnumber.value;
    let secondnumber=intent.slots.secondnumber.value;
    if (firstnumber&&secondnumber) {
      //perform operation
      let result=parseInt(firstnumber)+parseInt(secondnumber);
      speech=`the result is $ {firstnumber} plus {secondnumber} is $result`;
      displayText=`${result}`;

      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(appName,displayText)
      .withShouldEndSession (true)
    getResponse();
     }
    else {
      //Ask for required innput
      return handlerInput.responseBuilder
      .addDelegateDirective(intent)
      .getResponse();
    }
    }
  };
  


//end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        //help text for your skill
        let speechText = 'you can say , add 5 and 3';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

//Lambda handler function
//Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         addIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
