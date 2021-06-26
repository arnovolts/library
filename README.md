# Online Reading List

This project is an assignment from [the odin project](https://www.theodinproject.com/home) for the purpose of practicing:

* Prototypal inheritance
* Javascript objects

# Implementation

Books are stored in an array. Each book is an object generated
by a function constructor: 

```
function Book(){

   // code

} 

```
A function that flips the reading status of book is attached
to the `Book` prototype: 

```
Book.prototype.toggleStatus = function() {

   // code

} 

```
User generated data is stored in localstorage using the 
`window.localStorage` api


