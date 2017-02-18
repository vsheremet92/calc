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

function digitPressed(e, diff) {
    if (currNumber === '0' || result === '0') currNumber = '';
    switch (e.type) {
        case 'click':
            currNumber+=$(this).html();
            break;
        case 'keydown':
            currNumber+=e.which - diff;            
            break;
    }
    state.val(currNumber);
}

function clearState () {
    state.val(0);
    currNumber = '0';
}

function completeAction(e) {
    firstNumber = currNumber;
    state.val(firstNumber);
    currNumber = '0';
    switch(e.type) {
        case 'click':
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
            }
            break;
        case 'keydown':  
            switch(e.which) {
            case 111:
            case 191:
                currentAction = 'divide';
                break;
            case 106:
                currentAction = 'multiply';
                break;
            case 109:
            case 189:
                currentAction = 'subtract';
                break;
            case 107:
                currentAction = 'addition';
                break;
            }
            break;   
    };
}

function equals() {
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
    currNumber = result;
    state.val(currNumber);
    currentAction = '';
}

function deleteSymbol() {
    currNumber = currNumber.slice(0, currNumber.length-1);
    state.val(currNumber);
}

$(document).keydown(function(e) {
    var arrOfKeyActions = [106, 107, 109, 111, 189, 191];
    if (e.which >= 48 && e.which <= 57) digitPressed(e, 48);
    if (e.which >= 96 && e.which <= 105) digitPressed(e, 96);
    for (var i=0; i<arrOfKeyActions.length; i++) {
        if (e.which === arrOfKeyActions[i]) completeAction(e);    
    } 
    if (e.which === 27) clearState();
    if (e.which === 13 || e.which === 187) equals();
    if (e.which === 8) deleteSymbol();
});

digit.click(digitPressed);

action.click(completeAction);

getResult.click(equals);

plusMinus.click(function () {
    currNumber === 0 ? currNumber='0' : currNumber=-currNumber;
    state.val(currNumber);
})

clear.click(clearState);