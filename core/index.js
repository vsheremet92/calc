"use strict"

var state = $('#state');

var digit = $('.digit');
var clear = $('#clear');
var action = $('.action');
var plusMinus = $('#plus-minus');

var getResult = $('#get-result');

var currNumber = '';
var firstNumber = '';
var secondNumber = '';
var currentAction = '';

var result = 0;

action.click (function () {
    firstNumber = currNumber;
    state.val(firstNumber);
    currNumber = '0';
    switch($(this).attr('id')) {
        case 'div':
            currentAction = 'divide';
            break;
        case 'mult':
            currentAction = 'multiply';
            break;
        case 'sub':
            currentAction = 'subtract';
            break;
        case 'add':
            currentAction = 'addition';
            break;
    };
});

digit.click(function () {
    if (currNumber === '0' || result === '0') currNumber = '';
    currNumber+=$(this).html();
    state.val(currNumber);
});

getResult.click (function () {
    secondNumber = currNumber;
    switch (currentAction) {
        case 'divide':
            result = Number(firstNumber) / Number(secondNumber);
            break;
        case 'multiply':
            result = Number(firstNumber) * Number(secondNumber);
            break;
        case 'subtract':
            result = Number(firstNumber) - Number(secondNumber);
            break;
        case 'addition':
            result = Number(firstNumber) + Number(secondNumber);
            break;
    }
    state.val(result);
    currNumber = result;
    currentAction = '';
});

plusMinus.click(function () {
    currNumber === 0 ? currNumber='0' : currNumber=-currNumber;
    state.val(currNumber);
})

clear.click(function () {
    state.val(0);
    currNumber = '0';
});
