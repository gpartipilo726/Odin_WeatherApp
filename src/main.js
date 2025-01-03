import "./styles.css";
import {getAPIWeatherData, printWeather} from "./weather.js";

const searchBtn = document.querySelector('#search-Btn');
const input = document.querySelector('#search');
const error = document.querySelector('.error');

searchBtn.addEventListener('click', getWeather);

input.addEventListener('keypress', (e) => {

    if (e.key == 'Enter'){
        getWeather()
    }

});


async function getWeather() {
    try{
        let system = 'us';
        const data = await getAPIWeatherData(system);
        console.log(data);
    
        printWeather(data);

        const tempToggle = document.querySelector('#temp-Checkbox');
        tempToggle.addEventListener('click', toggleWeather);

    } catch (e){
        error.textContent = e;
    }
    
}

async function getWeatherTemp(system) {
    try{
        let system = 'us';
        const data = await getAPIWeatherData(system);
        console.log(data);
    
        printWeather(data);

    } catch (e){
        error.textContent = e;
    }
    
}





function toggleWeather(){
    let tempMeasurement = document.querySelector("#temp-Checkbox");
    console.log(tempMeasurement.getAttribute("system"));

    if(tempMeasurement.getAttribute("system") === "us"){
        tempMeasurement.setAttribute("system", "metric");
        getWeatherTemp(tempMeasurement.getAttribute("system"))
    } else {
        tempMeasurement.setAttribute("system", "us");
        getWeatherTemp(tempMeasurement.getAttribute("system"))
    }

}