import './css/styles.css';
import countryTpl from './templates/country.hbs'
import countriesListTpl from "./templates/contriesList.hbs"
import fetchCountries from "./fetchCountries";
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const countrySearch = document.querySelector("input#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

const clearMarkup = () => {
    countryInfo.innerHTML = "";
    countryList.innerHTML = "";
}

const searchValueLengthValidation = event => {
    if(event.target.value.trim() === "") {
        clearMarkup();
        return;
    }
}

const onCountrySearchInput = event => {
    searchValueLengthValidation(event);

    fetchCountries(event.target.value.trim())
    .then((countries) => {
        clearMarkup();
        if (countries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }
        else if (countries.length > 1) {
            countryList.insertAdjacentHTML('beforeend', generateCountryListMarkup(countries));
            return;
        }
        
        countryInfo.insertAdjacentHTML('beforeend', generateCountryMarkup(countries));
        return;
    }
    )
    .catch(error => error);
}

const generateCountryMarkup = countries => countries.map(countryTpl).join("");

const generateCountryListMarkup = countries => countries.map(countriesListTpl).join("");

countrySearch.addEventListener("input", debounce(onCountrySearchInput, DEBOUNCE_DELAY));