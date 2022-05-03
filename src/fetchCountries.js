export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/all?fields=name,capital,population,flags,languages`)
    .then(response => response.json())
    .then(data => data);
    // return fetch(`https://restcountries.com/v2/all?fields=name,capital,population,flags,languages/`).then(data => data.json()).then(data => console.log(data));
}

