const mongoose = require('mongoose');
const Result = require('./index.js');

const seedData = [
  {
    restaurantId: 1,
    restaurantName: "The Factory Kitchen",
    restaurantCuisine: "Italian",
    location: "Downtown, Downtown / South and East LA"
  },
  {
    restaurantId: 2,
    restaurantName: "Lonesome Dove",
    restaurantCuisine: "American",
    location: "Agua Dulce, San Fernando Valley"
  },
  {
    restaurantId: 3,
    restaurantName: "Bobby’s",
    restaurantCuisine: "Global",
    location: "Alhambra, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 4,
    restaurantName: "Melting Pot",
    restaurantCuisine: "Sushi",
    location: "Angeles Crest Angeles Forest"
  },
  {
    restaurantId: 5,
    restaurantName: "Daytime Place",
    restaurantCuisine: "Japanese",
    location: "Arcadia, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 6,
    restaurantName: "Easy Eats",
    restaurantCuisine: "American",
    location: "Artesia, Long Beach / Catalina"
  },
  {
    restaurantId: 7,
    restaurantName: "Macro Bites",
    restaurantCuisine: "Sushi",
    location: "Atwater Village, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 8,
    restaurantName: "Tartine Bianco",
    restaurantCuisine: "Barbecue",
    location: "Bel-Air, Westside"
  },
  {
    restaurantId: 9,
    restaurantName: "Broken Spanish",
    restaurantCuisine: "Japanese",
    location: "Beverly Crest, Westside"
  },
  {
    restaurantId: 10,
    restaurantName: "Moreton Fig",
    restaurantCuisine: "Sushi",
    location: "Beverly / Fairfax / La Brea / Third St, West Hollywood / Beverly Hills"
  },
  {
    restaurantId: 11,
    restaurantName: "Fare & Feed",
    restaurantCuisine: "Japanese",
    location: "Beverly Hills, West Hollywood / Beverly Hills"
  },
  {
    restaurantId: 12,
    restaurantName: "Golden Palace",
    restaurantCuisine: "Barbecue",
    location: "Brentwood, Westside"
  },
  {
    restaurantId: 13,
    restaurantName: "Soups & Snacks",
    restaurantCuisine: "American",
    location: "Burbank, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 14,
    restaurantName: "Quick Bite",
    restaurantCuisine: "Sushi",
    location: "Calabasas, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 15,
    restaurantName: "Fast & Friendly",
    restaurantCuisine: "Global",
    location: "Canoga Park, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 16,
    restaurantName: "Big Bites",
    restaurantCuisine: "Barbecue",
    location: "Torrance / Carson, Beach Cities"
  },
  {
    restaurantId: 17,
    restaurantName: "Blind Pig",
    restaurantCuisine: "Sushi",
    location: "Century City, Westside"
  },
  {
    restaurantId: 18,
    restaurantName: "Eatable",
    restaurantCuisine: "Japanese",
    location: "Cerritos, Downtown / South and East LA"
  },
  {
    restaurantId: 19,
    restaurantName: "Eatery",
    restaurantCuisine: "American",
    location: "Claremont, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 20,
    restaurantName: "Goodies",
    restaurantCuisine: "Global",
    location: "Commerce, Downtown / South and East LA"
  },
  {
    restaurantId: 21,
    restaurantName: "Lard Boy",
    restaurantCuisine: "Sushi",
    location: "Covina, Downtown / South and East LA"
  },
  {
    restaurantId: 22,
    restaurantName: "Many Foods",
    restaurantCuisine: "Japanese",
    location: "Culver City, Westside"
  },
  {
    restaurantId: 23,
    restaurantName: "Me Likey",
    restaurantCuisine: "Sushi",
    location: "Los Alamitos / Cypress, Downtown / South and East LA"
  },
  {
    restaurantId: 24,
    restaurantName: "Wonton Express",
    restaurantCuisine: "Global",
    location: "Desert View Highlands, Antelope Valley"
  },
  {
    restaurantId: 25,
    restaurantName: "Great Burger",
    restaurantCuisine: "American",
    location: "Diamond Bar, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 26,
    restaurantName: "Awesome Burger",
    restaurantCuisine: "Japanese",
    location: "Downey, Southeast"
  },
  {
    restaurantId: 27,
    restaurantName: "Amazing Sauce",
    restaurantCuisine: "Sushi",
    location: "Downtown, Downtown / South and East LA"
  },
  {
    restaurantId: 28,
    restaurantName: "Asian Express",
    restaurantCuisine: "Global",
    location: "Eagle Rock, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 29,
    restaurantName: "Fearless Wander",
    restaurantCuisine: "Japanese",
    location: "La Mirada, Downtown / South and East LA"
  },
  {
    restaurantId: 30,
    restaurantName: "Crate Express",
    restaurantCuisine: "American",
    location: "Echo Park, Hollywood"
  },
  {
    restaurantId: 31,
    restaurantName: "Smothered In Love",
    restaurantCuisine: "Sushi",
    location: "El Segundo, Beach Cities"
  },
  {
    restaurantId: 32,
    restaurantName: "Sweet Delectable",
    restaurantCuisine: "Global",
    location: "Hawthorne / Gardena, Beach Cities"
  },
  {
    restaurantId: 33,
    restaurantName: "Appetizing As Heck",
    restaurantCuisine: "Japanese",
    location: "Hawthorne, Beach Cities"
  },
  {
    restaurantId: 34,
    restaurantName: "Appetizing Bird",
    restaurantCuisine: "Sushi",
    location: "North Hollywood, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 35,
    restaurantName: "Scrumptious Temptations",
    restaurantCuisine: "Global",
    location: "West Hollywood, West Hollywood / Beverly Hills / Mid-Wilshire"
  },
  {
    restaurantId: 36,
    restaurantName: "Smile N’ Delight",
    restaurantCuisine: "American",
    location: "Hollywood, Hollywood"
  },
  {
    restaurantId: 37,
    restaurantName: "Choice Foods",
    restaurantCuisine: "Global",
    location: "Manhattan Beach / Hermosa Beach, Beach Cities"
  },
  {
    restaurantId: 38,
    restaurantName: "Dainty Dog",
    restaurantCuisine: "Sushi",
    location: "Hidden Hills Santa Monica Mountains"
  },
  {
    restaurantId: 39,
    restaurantName: "Hungry Dog",
    restaurantCuisine: "Japanese",
    location: "Highland Park, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 40,
    restaurantName: "Heavenly Creations",
    restaurantCuisine: "Global",
    location: "LAX / Westchester, Beach Cities"
  },
  {
    restaurantId: 41,
    restaurantName: "Food For Thought",
    restaurantCuisine: "Sushi",
    location: "Koreatown, West Hollywood / Beverly Hills / Mid-Wilshire"
  },
  {
    restaurantId: 42,
    restaurantName: "Food In My Tummy",
    restaurantCuisine: "American",
    location: "Lakewood / Bellflower, Long Beach / Catalina"
  },
  {
    restaurantId: 43,
    restaurantName: "Tum Tum Express",
    restaurantCuisine: "Global",
    location: "Lancaster, Antelope Valley"
  },
  {
    restaurantId: 44,
    restaurantName: "Lil Johnny’s",
    restaurantCuisine: "Japanese",
    location: "Long Beach, Long Beach / Catalina"
  },
  {
    restaurantId: 45,
    restaurantName: "Bill’s Burgers",
    restaurantCuisine: "Sushi",
    location: "Los Feliz, Hollywood"
  },
  {
    restaurantId: 46,
    restaurantName: "A Night In Paris",
    restaurantCuisine: "Global",
    location: "Malibu, Beach Cities"
  },
  {
    restaurantId: 47,
    restaurantName: "Distinctive Creations",
    restaurantCuisine: "American",
    location: "Manhattan Beach, Beach Cities"
  },
  {
    restaurantId: 48,
    restaurantName: "Spicy Heat",
    restaurantCuisine: "Global",
    location: "Marina del Rey, Westside"
  },
  {
    restaurantId: 49,
    restaurantName: "Spicy Jack’s",
    restaurantCuisine: "Japanese",
    location: "Mid-Wilshire, West Hollywood / Beverly Hills / Mid-Wilshire"
  },
  {
    restaurantId: 50,
    restaurantName: "Pepper Jack’s",
    restaurantCuisine: "Sushi",
    location: "Monrovia, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 51,
    restaurantName: "Rich Meat",
    restaurantCuisine: "Global",
    location: "Montebello, South and East LA"
  },
  {
    restaurantId: 52,
    restaurantName: "Fit For A King",
    restaurantCuisine: "American",
    location: "Monterey Park, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 53,
    restaurantName: "King of Meat",
    restaurantCuisine: "Japanese",
    location: "North Hills, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 54,
    restaurantName: "Delicious Donuts",
    restaurantCuisine: "Donuts",
    location: "Northridge, San Fernando Valley / Valencia"
  },
  {
    restaurantId: 55,
    restaurantName: "Rare Meats",
    restaurantCuisine: "Global",
    location: "Northwest Palmdale Antelope Valley"
  },
  {
    restaurantId: 56,
    restaurantName: "Rare Cuts",
    restaurantCuisine: "Japanese",
    location: "North Whittier, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 57,
    restaurantName: "Rare Choice",
    restaurantCuisine: "Barbecue",
    location: "Norwalk Southeast"
  },
  {
    restaurantId: 58,
    restaurantName: "Sapid Salads",
    restaurantCuisine: "American",
    location: "Pacific Palisades, Westside"
  },
  {
    restaurantId: 59,
    restaurantName: "Soup & Salad Express",
    restaurantCuisine: "Sushi",
    location: "Pacoima San Fernando Valley"
  },
  {
    restaurantId: 60,
    restaurantName: "Seasoned",
    restaurantCuisine: "Global",
    location: "Palmdale, Antelope Valley"
  },
  {
    restaurantId: 61,
    restaurantName: "Smitten",
    restaurantCuisine: "Japanese",
    location: "Rolling Hills Estates / Rancho Palos Verdes, Beach Cities"
  },
  {
    restaurantId: 62,
    restaurantName: "Love Street",
    restaurantCuisine: "Barbecue",
    location: "Pasadena, Pasadena / San Gabriel"
  },
  {
    restaurantId: 63,
    restaurantName: "Ice Cream Sandwiches",
    restaurantCuisine: "American",
    location: "South Pasadena, Pasadena / San Gabriel"
  },
  {
    restaurantId: 64,
    restaurantName: "For The Love Of Ice Cream",
    restaurantCuisine: "Global",
    location: "Playa del Rey, Beach Cities"
  },
  {
    restaurantId: 65,
    restaurantName: "Infatuated Creations",
    restaurantCuisine: "Sushi",
    location: "Playa Vista, Westside"
  },
  {
    restaurantId: 66,
    restaurantName: "Smack Dab",
    restaurantCuisine: "Barbecue",
    location: "Pomona, Pasadena / San Gabriel"
  },
  {
    restaurantId: 67,
    restaurantName: "Frozen Yogurt",
    restaurantCuisine: "Japanese",
    location: "Rancho Cucamonga, Inland Empire"
  },
  {
    restaurantId: 68,
    restaurantName: "Sherbet",
    restaurantCuisine: "Sushi",
    location: "Rancho Palos Verdes, Beach Cities"
  },
  {
    restaurantId: 69,
    restaurantName: "Mickey’s Foodstuff",
    restaurantCuisine: "American",
    location: "Rancho Park, Westside"
  },
  {
    restaurantId: 70,
    restaurantName: "Pick & Go",
    restaurantCuisine: "Barbecue",
    location: "Redondo Beach, Beach Cities"
  },
  {
    restaurantId: 71,
    restaurantName: "The Satiated Drink",
    restaurantCuisine: "Global",
    location: "Rolling Hills, Beach Cities"
  },
  {
    restaurantId: 72,
    restaurantName: "Pearl",
    restaurantCuisine: "Japanese",
    location: "Rolling Hills Estates, Beach Cities"
  },
  {
    restaurantId: 73,
    restaurantName: "Bless This Mess Hall",
    restaurantCuisine: "Sushi",
    location: "Rowland Heights, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 74,
    restaurantName: "Grits & Gravy",
    restaurantCuisine: "American",
    location: "San Dimas / La Verne, Pasadena / San Gabriel"
  },
  {
    restaurantId: 75,
    restaurantName: "Cheerful Hippo",
    restaurantCuisine: "Barbecue",
    location: "San Fernando, San Fernando Valley"
  },
  {
    restaurantId: 76,
    restaurantName: "Mealtime",
    restaurantCuisine: "Global",
    location: "San Gabriel Valley, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 77,
    restaurantName: "Summer’s End",
    restaurantCuisine: "Japanese",
    location: "San Pedro, Long Beach / Catalina"
  },
  {
    restaurantId: 78,
    restaurantName: "Winter Comes",
    restaurantCuisine: "Sushi",
    location: "Santa Monica, Westside"
  },
  {
    restaurantId: 79,
    restaurantName: "Nightcap",
    restaurantCuisine: "Barbecue",
    location: "Sherman Oaks, San Fernando Valley"
  },
  {
    restaurantId: 80,
    restaurantName: "It’s Good Food",
    restaurantCuisine: "American",
    location: "Silver Lake, Hollywood"
  },
  {
    restaurantId: 81,
    restaurantName: "Leggo My Wagyu",
    restaurantCuisine: "Global",
    location: "Diamond Bar, Pasadena / San Gabriel Valley"
  },
  {
    restaurantId: 82,
    restaurantName: "Tokyo Beat",
    restaurantCuisine: "Sushi",
    location: "Studio City, San Fernando Valley"
  },
  {
    restaurantId: 83,
    restaurantName: "New York Pulse",
    restaurantCuisine: "Barbecue",
    location: "Venice, Westside"
  },
  {
    restaurantId: 84,
    restaurantName: "Chicago Style Pizza",
    restaurantCuisine: "American",
    location: "Van Nuys, San Fernando Valley"
  },
  {
    restaurantId: 85,
    restaurantName: "Hill Country Fare",
    restaurantCuisine: "Global",
    location: "Downey / Norwalk / Sante Fe Springs, Downtown / South and East LA"
  },
  {
    restaurantId: 86,
    restaurantName: "TidBits",
    restaurantCuisine: "American",
    location: "Downtown, Downtown / South and East LA"
  },
  {
    restaurantId: 87,
    restaurantName: "No Place Like Home",
    restaurantCuisine: "Sushi",
    location: "Universal City, San Fernando Valley"
  },
  {
    restaurantId: 88,
    restaurantName: "Trial & Error",
    restaurantCuisine: "Barbecue",
    location: "Westwood, Westside"
  },
  {
    restaurantId: 89,
    restaurantName: "Rinse & Repeat",
    restaurantCuisine: "Japanese",
    location: "Winnetka, San Fernando Valley"
  },
  {
    restaurantId: 90,
    restaurantName: "Cook & Boil",
    restaurantCuisine: "Global",
    location: "Woodland Hills, San Fernando Valley"
  },
  {
    restaurantId: 91,
    restaurantName: "Broiler",
    restaurantCuisine: "Sushi",
    location: "New York, New York"
  },
  {
    restaurantId: 92,
    restaurantName: "Broiled Duck",
    restaurantCuisine: "Barbecue",
    location: "Las Vegas, Nevada"
  },
  {
    restaurantId: 93,
    restaurantName: "Prancing Pig",
    restaurantCuisine: "Chinese",
    location: "Scranton, Pennsylvania"
  },
  {
    restaurantId: 94,
    restaurantName: "Sweet Duck",
    restaurantCuisine: "Global",
    location: "Compton, South and East LA"
  },
  {
    restaurantId: 95,
    restaurantName: "Aaron’s",
    restaurantCuisine: "Japanese",
    location: "Seattle, Washington"
  },
  {
    restaurantId: 96,
    restaurantName: "Salt & Snow",
    restaurantCuisine: "Barbecue",
    location: "Miami, Florida"
  },
  {
    restaurantId: 97,
    restaurantName: "Roaring Tiger",
    restaurantCuisine: "Sushi",
    location: "Newark, New Jersey"
  },
  {
    restaurantId: 98,
    restaurantName: "Fig’s BBQ",
    restaurantCuisine: "Barbecue",
    location: "Dallas, Texas"
  },
  {
    restaurantId: 99,
    restaurantName: "Odd Pig",
    restaurantCuisine: "Continental",
    location: "New Orleans, Louisiana"
  },
  {
    restaurantId: 100,
    restaurantName: "Southside",
    restaurantCuisine: "American",
    location: "San Diego, CA"
  }
]

const seedFunction = () => {
    Result.insertMany(seedData)
        .then(() => {
            console.log('~~~~~~~~~~ Database seeded ~~~~~~~~~~');
            mongoose.connection.close(); // same as ctrl+c in node
        })
        .catch(error => console.log(error))
}

seedFunction()