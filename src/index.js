import './css/styles.css';
import fetchCountries from "./fetchCountries";
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const countrySearch = document.querySelector("input#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

countrySearch.addEventListener("input", debounce(onCountrySearchInput, DEBOUNCE_DELAY));

function onCountrySearchInput(event){
    
    fetchCountries(event.target.value.trim())
    .then((countries) => {
        if(event.target.value.trim() === "") {
            clearMarkup();
            return;
        }
        if (countries.length > 10) {
            clearMarkup();
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }
        else if (countries.length > 1) {
            clearMarkup();
            countryList.insertAdjacentHTML('beforeend', generateCountryListMarkup(countries));
            return;
        }
        
        clearMarkup();
        countryInfo.insertAdjacentHTML('beforeend', generateCountryMarkup(countries));
        return;
    }
    )
    .catch((error) => Notiflix.Notify.failure('Oops, there is no country with that name.'));
}

function generateCountryMarkup(countries) {
    return countries.map(country => {
        return `<div><img width="50" height="50" = src="${country.flags.svg}" alt="flag">
        \<span class="country__official">${country.name.official}</span><p><b>Capital: </b> ${country.capital}</p><p><b>Population: </b> ${country.population}</p><p><b>Languages: </b> ${Object.values(country.languages)}</p></div>`
    }).join("");
}

function generateCountryListMarkup(countries) {
    return countries.map(country => {
        return `<li><img width="50" height="50" = src="${country.flags.svg}" alt="flag">
        \<p class="country__official">${country.name.official}</p></li>`
    }).join("");
}

function clearMarkup() {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}
