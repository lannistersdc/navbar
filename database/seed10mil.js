const mongoose = require('mongoose');
const Result = require('./index.js');
var faker = require('Faker');
var fs = require('fs');
var path = require('path');

// --------------------------------------------
const desc = ['Soft', 'Open', 'Expensive', 'Beautiful', 'Elegant', 'Narrow', 'Wet', 'Classy', 
  'Lively', 'Colorful', 'Shiny', 'Marvelous', 'Nicest', 'Small', 'Big', 'Huge', 'Quaint', 'Hilltop',
  'Great', 'Impossible', 'Possible', 'Unremarkable', 'Remarkable', 'The Best', 'Spectacular', 'Outstanding', 
  'Lovely', 'Incomparable', 'Pleasant', 'Perfect', 'Cozy', 'Convenient', 'Magic', 'Scenic', 'Picturesque',
  'Magical', 'Private', 'Vintage', 'Charming', 'Modern', 'Luxurious',  'King', 'Queen'];
const color = ['Red', 'Yellow', 'Green', 'Pink', 'Golden', 'Silver', 'Copper', 'Bronze', 'Blue', 'Amber'];
const otherNameThings = ['A1', 'BBQ', 'Jungle', 'Cajun', 'Creole', 'Glass', 'Angel', 'Oriental'];
const area = ['Entrance', 'Doorway', 'Bedroom', 'Bathroom', 'Study', 'Living Room', 'Basement', 'Attic', 
  'Closet', 'Library', 'Porch', 'Yard', 'Roof', 'Kitchen', 'Dining room', 'Garage', 'Backdoor', 'Sidedoor',
  'Loft', 'Home', 'Suite', 'Castle', 'Mansion', 'Table', 'Bakery', 'Grill', 'Oven', 'Izakaya', 'Shop'];
const locations = ['Los Angeles', 'Glendale', 'Marina del Rey', 'Hollywood', 'Hawthorne', 'Pasadena', 
  'Inglewood', 'Compton', 'Koreatown', 'Westchester', "Bel-Air", "Beverley Hills", "West LA", 'Santa Monica', 
  'Venice', 'Malibu', "New Orleans", 'Louisiana', `${faker.Address.city()}`, `${faker.Address.usState()}`,
  `${faker.Address.brState()}`];
const dishes = ['Sushi', 'Pizza', 'Steak', 'Sandwhich', 'BBQ', 'Fried Chicken', 'Salad Bar', 'Shabu', 
  'Hot Pot'];

const cuisines = ['American', 'Japanese', 'Italian', 'German', 'Korean', 'Filipino', 'Mexican', 'Peruvian',
  'Thai', 'Hawaiian', 'Chinese', 'Fusion', 'Indian', 'Halal', 'Vegan', 'Cajun', 'Creole', 'Ethiopian', 
  'Mediterranean', 'Belgian', 'Barbeque', 'Continental', 'Global', 'Sushi', 'Donut', 'Dessert']

let randomElement = function(array){
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const restaurantNames = [
  `${randomElement(otherNameThings)} ${randomElement(cuisines)} ${randomElement(dishes)}`,
  `"${randomElement(otherNameThings)} ${randomElement(cuisines)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${randomElement(color)} ${randomElement(area)}`,
  `"${randomElement(color)} ${randomElement(area)}, ${randomElement(locations)}"`,
  `${randomElement(locations)} ${randomElement(dishes)}`,
  `${randomElement(locations)} ${randomElement(dishes)} ${randomElement(area)}`,
  `${randomElement(otherNameThings)} ${randomElement(dishes)}`,
  `"${randomElement(otherNameThings)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${randomElement(desc)} ${randomElement(dishes)}`,
  `"${randomElement(desc)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${randomElement(cuisines)} ${randomElement(desc)} ${randomElement(dishes)}`,
  `"${randomElement(cuisines)} ${randomElement(desc)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${randomElement(cuisines)} ${randomElement(dishes)}`,
  `${randomElement(locations)} ${randomElement(dishes)}`,
  `${randomElement(locations)} ${randomElement(desc)} ${randomElement(dishes)}`,
  `${randomElement(locations)} ${randomElement(cuisines)} ${randomElement(dishes)}`,
  `${randomElement(desc)} ${randomElement(area)} ${randomElement(dishes)}`,
  `${faker.Name.firstName()}'s ${randomElement(otherNameThings)} ${randomElement(cuisines)} ${randomElement(dishes)}`,
  `"${faker.Name.firstName()}'s ${randomElement(otherNameThings)} ${randomElement(cuisines)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${faker.Name.firstName()}'s ${randomElement(color)} ${randomElement(area)}`,
  `"${faker.Name.firstName()}'s ${randomElement(color)} ${randomElement(area)}, ${randomElement(locations)}"`,
  `${faker.Name.firstName()}'s ${randomElement(otherNameThings)} ${randomElement(dishes)}`,
  `"${faker.Name.firstName()}'s ${randomElement(otherNameThings)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${faker.Name.firstName()}'s ${randomElement(desc)} ${randomElement(dishes)}`,
  `"${faker.Name.firstName()}'s ${randomElement(desc)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${faker.Name.firstName()}'s ${randomElement(cuisines)} ${randomElement(desc)} ${randomElement(dishes)}`,
  `"${faker.Name.firstName()}'s ${randomElement(cuisines)} ${randomElement(desc)} ${randomElement(dishes)}, ${randomElement(locations)}"`,
  `${faker.Name.firstName()}'s ${randomElement(cuisines)} ${randomElement(dishes)}`,
  `${faker.Name.firstName()}'s ${randomElement(desc)} ${randomElement(area)} ${randomElement(dishes)}`,
  `${faker.Name.firstName()} & ${faker.Name.firstName()}'s ${randomElement(cuisines)} ${randomElement(dishes)}`
];

const someState = ['California', faker.Address.brState(), faker.Address.usState(), 'Arizona', 
  faker.Address.brState(), faker.Address.usState(), 'Texas', faker.Address.brState(), faker.Address.usState(), 
  'New York', faker.Address.brState(), faker.Address.usState(), 'Florida', faker.Address.brState(), 
  faker.Address.usState(), 'Maine', faker.Address.brState(), faker.Address.usState(), 'Nevada', 
  faker.Address.brState(), faker.Address.usState(), 'Oregon', faker.Address.brState(), faker.Address.usState(),
  'Colorado', faker.Address.brState(), faker.Address.usState(), 'New Mexico', faker.Address.brState(), 
  faker.Address.usState(), 'Delaware', faker.Address.brState(), faker.Address.usState()]

//-----------------------------------------------

var seedData = [];

generateEntry = (id) => {
  var propObj = {
    restaurantId: id,
    restaurantName: randomElement(restaurantNames),
    restaurantCuisine: randomElement(cuisines),
    location: `"${randomElement(locations)}, ${randomElement(someState)}"`
  };
  return propObj
};

var writer = fs.createWriteStream(__dirname + '/data.csv')
let start = new Date();

function seed10mil(writer, callback) {
  let i = 10000000;
  let counter = 0
  write();
  function write() {
    let ok = true;
    do {
      let data = generateEntry(counter);
      counter++;
      if (i === 10000000) {
        writer.write('restaurantId, restaurantName, restaurantCuisine, location\n');
      };
      i--;
      if (i === 0) {
        var csv = Object.values(data).join(',');
        writer.write(csv, callback);
        console.log('Completed Writing:', counter, 'entries');
        mongoose.connection.close();
      } else {
        var csv = Object.values(data).join(',');
        ok = writer.write(csv + '\n');
        console.log('Wrote:', counter)
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

seed10mil(writer, () => {
  var stop = new Date();
  console.log('Length:', stop - start)
});
// console.log(seedData)

// NOTE: DO NOT invoke this function as part of your
// server code - it is meant to only be run once so that
// you have access to data to work with