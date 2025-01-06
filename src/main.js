import "./styles.css";
import {getAPIWeatherData, printWeather} from "./weather.js";

const searchBtn = document.querySelector('#search-Btn');
const input = document.querySelector('#search');
const error = document.querySelector('.error');
const tempToggle = document.querySelector('#temp-Checkbox');

searchBtn.addEventListener('click', initWeather);

input.addEventListener('keypress', (e) => {

    if (e.key == 'Enter'){
        initWeather()
    }

});


async function initWeather() {
    try{
        const toggleWeatherBtn = document.querySelector('.slider-container');
        let system = 'us';
        
        const data = await getAPIWeatherData(system);
    
        printWeather(data);
        toggleWeatherBtn.style.display = 'flex';

    } catch (e){
        error.textContent = e;
    }
    
}

async function getWeatherTemp(system) {
    try{
        const data = await getAPIWeatherData(system);
    
        printWeather(data);

    } catch (e){
        error.textContent = e;
    }
    
}


tempToggle.addEventListener('click', toggleWeather);



function toggleWeather(){
    console.log("inside toggle weather func")
    let tempMeasurement = document.querySelector("#temp-Checkbox");
    console.log(tempMeasurement.value);

    if(tempMeasurement.checked){
        getWeatherTemp("metric");
    } else if(!tempMeasurement.checked) {
        getWeatherTemp("us");

    }




    // console.log(tempMeasurement.getAttribute("system"));

    // if(tempMeasurement.getAttribute("system") === "us"){
    //     tempMeasurement.setAttribute("system", "metric");
    //     getWeatherTemp(tempMeasurement.getAttribute("system"))
    // } else {
    //     tempMeasurement.setAttribute("system", "us");
    //     getWeatherTemp(tempMeasurement.getAttribute("system"))
    // }

}