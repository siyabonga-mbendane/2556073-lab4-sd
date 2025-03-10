const countryName = document.getElementById("country");
const submitButton = document.getElementById("btn");
const countryInfo = document.getElementById("country-info");
const otherCountry = document.getElementsByName("bordering-countries");

const urlAPI = "https://restcountries.com/v3.1/all"


submitButton.addEventListener('click', async () => { 
    const country = countryName.value;
    if(country === ""){
        alert("county name not  provided");
    }
    try{
        const response = await fetch(`${urlAPI}`);
        const responseData = await response.json();
        
        const dataCountry  = responseData[0];
        countryInfo.textContent(`${dataCountry}`);
    }
    catch(error){
        console.error(error);
        countryInfo.textContent = `{error.message}`;
    }
});