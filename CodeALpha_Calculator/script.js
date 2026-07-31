// ===============================
// CODEALPHA CALCULATOR
// ===============================

// Display

const display = document.getElementById("display");


// ===============================
// APPEND VALUES
// ===============================

function appendValue(value){

    display.value += value;

}



// ===============================
// CLEAR DISPLAY
// ===============================

function clearDisplay(){

    display.value = "";

}



// ===============================
// DELETE LAST CHARACTER
// ===============================

function deleteLast(){

    display.value = display.value.slice(0,-1);

}



// ===============================
// CALCULATE RESULT
// ===============================

function calculate(){

    try{

        if(display.value===""){

            return;

        }

        let result = eval(display.value);

        if(result===Infinity || result===-Infinity){

            display.value="Cannot divide by 0";

            return;

        }

        display.value=result;

    }

    catch{

        display.value="Error";

    }

}



// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown",function(event){

    const key = event.key;

    // Numbers

    if(!isNaN(key)){

        appendValue(key);

    }

    // Operators

    else if(

        key==="+" ||

        key==="-" ||

        key==="*" ||

        key==="/" ||

        key==="." ||

        key==="%"

    ){

        appendValue(key);

    }

    // Enter

    else if(key==="Enter"){

        event.preventDefault();

        calculate();

    }

    // Backspace

    else if(key==="Backspace"){

        deleteLast();

    }

    // Escape

    else if(key==="Escape"){

        clearDisplay();

    }

});



// ===============================
// PREVENT DOUBLE OPERATORS
// ===============================

const operators = ["+","-","*","/","%"];

function appendValue(value){

    let current = display.value;

    let lastChar = current[current.length-1];

    if(

        operators.includes(lastChar)

        &&

        operators.includes(value)

    ){

        return;

    }

    display.value += value;

}



// ===============================
// AUTO SCROLL DISPLAY
// ===============================

display.addEventListener("input",()=>{

    display.scrollLeft=display.scrollWidth;

});



// ===============================
// CONSOLE MESSAGE
// ===============================

console.log("Calculator Loaded Successfully");