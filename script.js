const countryName = document.getElementById('country');
const submitButton = document.getElementById('btn');
const countryInfo = document.getElementById('country-info');
const bordCountries = document.getElementById('bordering-countries');



async function getData()
{
    const urlAPI = `https://restcountries.com/v3.1/name/${countryName.value}`;
    try{

        const response = await fetch(urlAPI);
        if(!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const returnData = await response.json();

        //retrieve first country in array
        const country = returnData[0];

        // Extract relevant information
        const capital = country.capital[0];
        const population = country.population.toLocaleString();
        const region = country.region;
        const flag = country.flags.png;

        // Update the DOM with country information
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <img src="${flag}" alt="Flag of ${country.name.common}" width="100">
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</p>
            <p><strong>Region:</strong> ${region}</p>
        `;

        // Fetch and display neighboring countries
        if (country.borders && country.borders.length > 0) {
            const borders = country.borders.join(',');
            const neighborsResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`);

            const neighborsData = await neighborsResponse.json();

            bordCountries.innerHTML = '<h3>Neighboring Countries:</h3>';
            neighborsData.forEach(neighbor => {
                bordCountries.innerHTML += `
                    <div>
                        <img src="${neighbor.flags.png}" alt="Flag of ${neighbor.name.common}" width="50">
                        <p>${neighbor.name.common}</p>
                    </div>
                `;
            });
        } else {
            bordCountries.innerHTML = '<p>No neighboring countries.</p>';
        }




    }catch(error){
        console.error(error.message);

    }
}


submitButton.addEventListener('click', getData);

