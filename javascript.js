// FUNCTIONS
var test = (variable) => console.log(variable);

let bears = ["polar","koala"].filter((bear) => bear !== "koala");
// OR
bears = ["polar","koala"].filter((bear) => {
  return bear !== "koala";
});



//LET [Basically makes everything private]
let type = "variable";
//CONST [Disable messing with constant variables]
const PI = 3.14;

 //CLASSES Constructor defines all bears
 class Bear{
   constructor(){
     this.type = "bear";
   }
   says (say){
     console.log(this.type + " says " + say);
   }
 }

class Grizzly extends Bear{ // takes all the information from bear class
  constructor(){
    super() // calls the extended class' constructor
    this.type = "grizzly";
  }
}
//BACK TICKS

bear = "grizzly";
let says = "growl";

console.log(`The ${bear} says ${says}`); //THIS IS AMAZING DONT FORGET THE BACK TICKS!


//Adding defaults to functions!

var testFunction = (type="grizzly") => console.log(type);



$(document).ready(=>{
  test(3);
  let bear = new Bear();
  let grizzly = new Grizzly();
  grizzly.says("growl");
  testFunction();
});

document.onkeydown = (e) => {
  if (e.keyCode == "46"){

  }
};
