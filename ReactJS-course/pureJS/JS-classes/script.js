"use strict";


const guest = {
    name: "Aldwin",
    contact: 123456,
    greet() {
        console.log(this.name);
    }
}

//guest.greet(); // "Aldwin"


class Person {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

const person1 = new Person("Aldwin Duque");

//person1.sayName(); // "Aldwin Duque"

class Student {
    constructor(name,age){
        this.name = name,
        this.age = age
    }

    displayNameAge() {
        console.log(`Student name: ${this.name} Age: ${this.age}`)
    }
}

const student1 = new Student("Aldwin", 28);

//student1.displayNameAge(); // Student name: Aldwin Age: 28

// No inheritance just passing objects

class workPosition {
    constructor(job, salary) {
        this.job = job;
        this.salary = salary;
    }
}

class employee {
    constructor(name, position){
        this.name = name;
        this.position = position;
    }

      displaySalary() {
        console.log(this.name, this.position.job, this.position.salary); //Aldwin Manager 10000
    }
}

const manager = new workPosition("Manager", 10000)
/*
    manager = {

        job: "Manager",

        salary: 10000,

    }
*/

const employee2 = new employee("Aldwin",manager);
/*
    employee2 = {

        name: "Aldwin",

        position: {

            job: "Manager",

            salary: 10000,

        }
    }
*/

// employee2.displaySalary();

// console.log(manager);
// console.log(employee2);


// Parent class

/*
class Vehicle {

    constructor(brand,model){

        this.brand = brand;

        this.model = model;
    
    }

    start() {

        console.log(`${this.brand} is starting...`)

    }
}


// Child class
class Car extends Vehicle{

    constructor(brand, model){

        super(brand, model);

    }

    drive(){

        console.log(`${this.brand} ${this.model} is driving`);

    }

    start() {

        super.start();

        console.log(`${this.brand} ${this.model} engine is roaring`);
    }

}

// Child class
class Motorcycle extends Vehicle {

    constructor(brand, model){

        super(brand, model);

    }

    ride(){

        console.log(`Lets ride in a new ${this.brand} ${this.model}`)

    }

    start(){

        super.start();

        console.log(`${this.brand} ${this.model} engine is revving VROOOOM!`)
    }
}
*/

// assigning the new object to a new variable and calling the child class where I inherited the method from parent class Vehicle.
//const car1 = new Car("Toyota", "Corolla");

// car1.start(); //Toyota is starting...

// car1.drive(); //Toyota Corolla is driving

//const motor1 = new Motorcycle("Yamaha", "Nmax155");

// motor1.start();
// motor1.ride();
// motor1.start();


class Payment {

    constructor(amount){
        this.amount = amount;
    }

    payAmount(){

        console.log(`Paying $${this.amount}`);
    }
    

    static total(transactions) {
        return transactions.reduce((sum,t) => sum + t.amount, 0);
    }
}

class CashPayment extends Payment{

    constructor(amount){

        super(amount);

    }

    payAmount(){

        console.log(`Paying $${this.amount} in cash`);

    }
}

class CreditCardPayment extends Payment{

    constructor(amount){

        super(amount);

    }

    payAmount() {

        console.log(`Charging $${this.amount} to credit card`);

    }
}

class GcashPayment extends Payment{

    constructor(amount) {

        super(amount);

    }

    payAmount(){

        console.log(`Sending $${this.amount} via Gcash`);
    }
}

const transactions = [

    new CashPayment(500),

    new CreditCardPayment(500),

    new GcashPayment(500),

    new CashPayment(800),

    new CreditCardPayment(800),

    new GcashPayment(800),
]

//transactions.forEach(trans => {trans.payAmount()});

const total = Payment.total(transactions);

//console.log(`Total payment: ${total}`);


// GETTERS AND SETTERS
class Vehicle {

    constructor(brand){

        this.brand = brand;

    }

    start() {

        console.log(`${this.brand} is starting...`)

    }
}


// Child class
class Car extends Vehicle {

    constructor(brand,model){

        super(brand);

        this._brand = brand;

        this._model = model;

    }

    drive(){

        console.log(`${this.brand} ${this.model} is driving`);

    }

    start() {

        super.start();

        console.log(`${this.brand} ${this.model} engine is roaring`);
    }

// Getters
    get brand() {

        return this._brand;

    }

    get model() {

        return this._model;

    }

    // Setters
    set brand(newBrand) {

        if(newBrand === "") {
            
            console.log("Please enter a brand name");

            return;
        }

        this._brand = newBrand;

    }

    set model(newModel) {

        console.log(`Model updated from ${this._model} to ${newModel}`);

        this._model = newModel;

    } 
    
}

// Child class
class Motorcycle extends Vehicle {

    constructor(brand, model){

        super(brand, model);

    }

    ride(){

        console.log(`Lets ride in a new ${this.brand} ${this.model}`)

    }

    start(){

        super.start();

        console.log(`${this.brand} ${this.model} engine is revving VROOOOM!`)
    }
}


// assigning the new object to a new variable and calling the child class where I inherited the method from parent class Vehicle.
const car1 = new Car("Toyota", "Corolla");

//console.log(car1.brand);

//car1.model = "Vios";

//console.log(car1.model);

//const car2 = new Car("","LC");

//console.log(car2.brand);

class Pet {

    constructor(name,age) {

        this._name = name;

        this._age = age;

    }

    get name() {

        return this._name;

    }

    get age() {

        return this._age;

    }

    get humanAge() {

        const convertedAge = this._age * 7;

        return convertedAge;

    }

    set name(petName){

        if(petName === "" || petName == null) {

            console.log("Please enter a Pet name");

            return;

        }else console.log("Allowed");

        this._name = petName;

    }

    set age(petAge) {

        if(petAge < 0 ) {

            alert("Negative age value is invalid");

            return;

        }

        this._age = petAge;
    }

    speak() {

        console.log(`${this._name} says: Woof!`);

    }
}

// const dog = new Pet("Buddy", 3);

// console.log(dog.name);
// console.log(dog.age);
// console.log(dog.humanAge);

// dog.age = 5;

// console.log(dog.age); // 5

// console.log(dog.humanAge); // 5 * 7 = 35

// dog.speak();

class CartItem {

    constructor(name, price, quantity) {

        this.name = name;

        this.price = price;

        this.quantity = quantity;

    }

    // GETTERS

    get name() {

        return this._name;

    }

    get price() {

        return this._price.toFixed(2);

    }

    get quantity() {

        return this._quantity;

    }

    get totalPrice() {

        const totalPrice = this._price * this._quantity;

        return totalPrice.toFixed(2);

    }

    get discountedPrice() {

        if(this._quantity >= 5) {

            const discount = this.totalPrice * 0.10;

            const discountedPrice = this.totalPrice - discount;

            return discountedPrice;

        } else console.log("You must have a minimim 5 items purchase to avail the 10% discount")
    }

    // SETTERS

    set name(itemName) {

        if(itemName === "") {

            console.error("Invalid name");
            
            return;

        }

        this._name = itemName;
    }

    set price(itemPrice) {

        if(itemPrice < 0) {

            console.error("Invalid price");

            return;

        }

        this._price = itemPrice;

    }

    set quantity(itemQuantity) {

        if(itemQuantity < 1) {

            console.log("Quantity adjusted to minimum of 1");

            itemQuantity = 1;
        }

        this._quantity = itemQuantity;

    }
}
const item = new CartItem("Mouse", 1000, 5);
//console.log(item.discountedPrice); // (1000 * 5) => 5000 - 10% = 4500

//const item1 = new CartItem("", -2, 5); // throw errors


// Encapsulation and #Private property
class UserAccount {

    #password;
    #userName;

    constructor(userName,password) {

        this.#userName = userName;

        this.#password = password;

    }

    //getter
    get userName() {

        return this.#userName;

    }

    get password() {

        return this.#password;

    }

    // setter

    set userName(inputUsername) {

        if(inputUsername === "") {

            console.error("Username cannot be empty");

            return;

        }

        this.#userName = inputUsername;

    }

    set password(inputPassword) {

        if(inputPassword.length <= 8) {

            console.error("Password must be 8+ characters");
            
            return;
        }

        console.log("Valid password");

        this.#password = inputPassword;

    }
}

// const user = new UserAccount("john", "secret123");

// console.log(user.userName); // "john"

// user.password = "123"; // ❌ too 

// user.password = "supersecret"; // ✔ okay

// user.userName = ""; // Username cannot be empty

// ABSTRACTION Hiding complexity of the method
class UserLogin {

    // #Private method
    #encryptPassword(password) {

        // ES6 chaining
        return [...password].reverse().join("");
        // string to array.reverse array.join convert to string.
    }

    // #Private method
    #loginAttemptSuccessful() {
        
        console.log("Login success!");

    }
    
    // #Private method
    #loginAttemptFailed() {

        console.log("Login failed! you must have a valid name and password");

    }

    // Public method only user can see
    login(userName,password) {

        // Check if the username and password is valid
        if(userName === "" || password.length < 8) {

            this.#loginAttemptFailed();

            return;

        } else {

            this.#loginAttemptSuccessful();

            console.log(this.#encryptPassword(password));

        }

    }
}

// const user = new UserLogin();

// user.login("aldwin", "mypassword");

// user.login("","asdasdasdas")

// Composition

class EmailService {
    send(message) {
        console.log(`Sending EMAIL: ${message}`);
    }
}

class SMSService {
    send(message) {
        console.log(`Sending SMS: ${message}`);
    }
}

class PushService {
    send(message) {
        console.log(`Sending PUSH: ${message}`);
    }
}

class UserNotification {
    constructor(service) {
        this.service = service;
    }

    notify(message) {
        this.service.send(message);
    }

    changeService(newService) {
        this.service = newService;
    }
}

const email = new EmailService();
const sms = new SMSService();
const push = new PushService();

const notifier = new UserNotification(email);
notifier.notify("Welcome to our app!");   // EMAIL

notifier.changeService(sms);
notifier.notify("Your code is 12345");    // SMS

notifier.changeService(push);
notifier.notify("New message arrived!");  // PUSH
