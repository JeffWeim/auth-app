var quotes = require('./quotes.json');
	secretQuotes = require('./secretQuotes.json');

exports.getRandomOne = function() {
    var totalAmount = quotes.length;
    var rand = Math.ceil(Math.random() * totalAmount);
    return quotes[rand];
}


exports.getRandomSecretOne = function() {
    var totalAmount = secretQuotes.length;
    var rand = Math.ceil(Math.random() * totalAmount);
    return secretQuotes[rand];
}