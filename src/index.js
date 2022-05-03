import './css/styles.css';
import fetchCountries from "./fetchCountries";
var debounce = require('lodash.debounce');

const countries = fetchCountries().then(value => {
    value.map(el => console.log(el.name))
});

// countries.forEach(country => console.log(country));
// console.log(countries);

const DEBOUNCE_DELAY = 300;

// debounce(fetchCountries("peru"), DEBOUNCE_DELAY);
