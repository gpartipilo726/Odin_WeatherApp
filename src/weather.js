
import moment from 'moment';
import clearIcon from './imgs/clear-day.svg';
import clearNightIcon from './imgs/clear-night.svg';
import cloudyIcon from './imgs/cloudy.svg';
import fogIcon from './imgs/fog.svg';
import partlyCloudyIcon from './imgs/partly-cloudy-day.svg';
import partlyCloudyNightIcon from './imgs/partly-cloudy-night.svg';
import rainIcon from './imgs/rain.svg';
import snowIcon from './imgs/snow.svg';
import windIcon from './imgs/wind.svg';


const APIKEY = '5JYFNCQTKVJZH62JZKUGMCHZR'
const searchBar = document.querySelector('#search');

//gets weather data from API
export async function getAPIWeatherData (system){
    try{
        let dates = getDates();
        let response;
        
        if(system === 'us'){
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchBar.value}/${dates[0]}/${dates[1]}?key=${APIKEY}&unitGroup=us&iconSet=icons1`, {mode: 'cors'})
            return await response.json();

        } else if(system === 'metric'){
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchBar.value}/${dates[0]}/${dates[1]}?key=${APIKEY}&unitGroup=metric&iconSet=icons1`, {mode: 'cors'})
            return await response.json();

        }


    } catch (error){
        console.log(error);
    };
    

}

//delivers dates for weather API
function getDates(){
    let arr = [];

    const todaysDate = moment().format('YYYY-MM-DD')
    const fiveDayForecast = moment().add(4, 'days').format('YYYY-MM-DD');
    arr.push(todaysDate);
    arr.push(fiveDayForecast);
    return arr;
}

function getDayOfWeek(date){
    const dateData = new Date(date.replace(/-/g, '\/'));
    let day = dateData.getDay();
    let week = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    return week[day];
}

function getWeatherIcon(ApiIconRes){
    switch(ApiIconRes){
        case "snow":
            return snowIcon;
        case "rain":
            return rainIcon;
        case "fog":
            return fogIcon;
        case "wind":
            return windIcon;
        case "cloudy":
            return cloudyIcon;
        case "partly-cloudy-day":
            return partlyCloudyIcon;
        case "partly-cloudy-night":
            return partlyCloudyNightIcon;
        case "clear-day":
            return clearIcon;
        case "clear-night":
            return clearNightIcon;
    }
}



//formats API data to appear on page
export function printWeather(data){
    const display = document.querySelector('.display-content');

    display.innerHTML = 
    `
    <div class="forecast-background">
        <div class="header">
            <h2 class="header-title">${data.resolvedAddress}</h2>
            <h2 class="slider-temp">F°</h2>
            <label class="switch">
                <input id="temp-Checkbox" system="us" type="checkbox">
                <span class="slider round"></span>
            </label>
            <h2 class="slider-temp">C°</h2>
        </div>
            <div class="forecast-container">
                <div class="main-content">
                    <div class="main-content-item">
                        <h2>Today</h2>
                        <div class="main-temp-item">
                            <img src="${getWeatherIcon(data.days[0].icon)}" alt="${data.days[0].icon}">
                            <h3>${data.days[0].temp}°</h3>
                        </div>
                        <h4>${getDayOfWeek(data.days[0].datetime)}, ${data.days[0].datetime.slice(5).replace(/-/g, '\/')}</h4>
                        <h5>${data.days[0].conditions}</h5>
                        <div class="temp-data">
                            <div class="forecast-dataItem">
                                <p>Min Temp:</p><p>${data.days[0].tempmin}°</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>Max Temp:</p><p>${data.days[0].tempmax}°</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>Humidity:</p><p>${data.days[0].dew}</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>% of Rain:</p><p>${data.days[0].precipprob}%</p>
                            </div>
                        </div> 
                    </div>
                    <div class="main-content-item">
                        <h2>Tomorrow</h2>
                        <div class="main-temp-item">
                            <img src="${getWeatherIcon(data.days[1].icon)}" alt="${data.days[1].icon}">
                            <h3 >${data.days[1].temp}°</h3>
                        </div>
                        <h4>${getDayOfWeek(data.days[1].datetime)}, ${data.days[1].datetime.slice(5).replace(/-/g, '\/')}</h4>
                        <h5>${data.days[1].conditions}</h5>
                        <div class="temp-data">
                            <div class="forecast-dataItem">
                                <p>Min Temp:</p><p>${data.days[1].tempmin}°</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>Max Temp:</p><p>${data.days[1].tempmax}°</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>Humidity:</p><p>${data.days[1].dew}</p>
                            </div>
                            <div class="forecast-dataItem">
                                <p>% of Rain:</p><p>${data.days[1].precipprob}%</p>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="forecast-main">
            <h2 class="header-title">5-Day Forecast</h2>
            <div class="forecast-body">
                <div class="forecast-item">
                    <h2 class="forecast-day">${getDayOfWeek(data.days[0].datetime)}, ${data.days[0].datetime.slice(5).replace(/-/g, '\/')}</h2>
                    <div class="forecast-temp-item">
                        <img class="forecast-img" src="${getWeatherIcon(data.days[0].icon)}" alt="${data.days[0].icon}">
                        <h3 class="forecast-maintemp">${data.days[0].temp}°</h3>
                    </div>                        
                    <h5 class="forecast-desc">${data.days[0].conditions}</h5>
                    <div class="temp-data">
                        <div class="forecast-dataItem">
                            <p>Min Temp:</p><p>${data.days[0].tempmin}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Max Temp:</p><p>${data.days[0].tempmax}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Humidity:</p><p>${data.days[0].dew}</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>% of Rain:</p><p>${data.days[0].precipprob}%</p>
                        </div>
                    </div> 
                </div>
                <div class="forecast-item">
                    <h2 class="forecast-day">${getDayOfWeek(data.days[1].datetime)} , ${data.days[1].datetime.slice(5).replace(/-/g, '\/')}</h2>
                    <div class="forecast-temp-item">
                        <img class="forecast-img" src="${getWeatherIcon(data.days[1].icon)}" alt="${data.days[1].icon}">
                        <h3 class="forecast-maintemp">${data.days[1].temp}°</h3>
                    </div>                         
                    <h5 class="forecast-desc">${data.days[1].conditions}</h5>
                    <div class="temp-data">
                        <div class="forecast-dataItem">
                            <p>Min Temp:</p><p>${data.days[1].tempmin}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Max Temp:</p><p>${data.days[1].tempmax}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Humidity:</p><p>${data.days[1].dew}</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>% of Rain:</p><p>${data.days[1].precipprob}%</p>
                        </div>
                    </div> 
                </div>
                <div class="forecast-item">
                    <h2 class="forecast-day">${getDayOfWeek(data.days[2].datetime)}, ${data.days[2].datetime.slice(5).replace(/-/g, '\/')}</h2>
                    <div class="forecast-temp-item">
                        <img class="forecast-img" src="${getWeatherIcon(data.days[2].icon)}" alt="${data.days[2].icon}">
                        <h3 class="forecast-maintemp">${data.days[2].temp}°</h3>
                    </div>                         
                    <h5 class="forecast-desc">${data.days[2].conditions}</h5>
                    <div class="temp-data">
                        <div class="forecast-dataItem">
                            <p>Min Temp:</p><p>${data.days[2].tempmin}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Max Temp:</p><p>${data.days[2].tempmax}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Humidity:</p><p>${data.days[2].dew}</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>% of Rain:</p><p>${data.days[2].precipprob}%</p>
                        </div>
                    </div> 
                </div>
                <div class="forecast-item">
                    <h2 class="forecast-day">${getDayOfWeek(data.days[3].datetime)}, ${data.days[3].datetime.slice(5).replace(/-/g, '\/')}</h2>
                    <div class="forecast-temp-item">
                        <img class="forecast-img" src="${getWeatherIcon(data.days[3].icon)}" alt="${data.days[3].icon}">
                        <h3 class="forecast-maintemp">${data.days[3].temp}°</h3>
                    </div>                        
                    <h5 class="forecast-desc">${data.days[3].conditions}</h5>
                    <div class="temp-data">
                        <div class="forecast-dataItem">
                            <p>Min Temp:</p><p>${data.days[3].tempmin}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Max Temp:</p><p>${data.days[3].tempmax}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Humidity:</p><p>${data.days[3].dew}</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>% of Rain:</p><p>${data.days[3].precipprob}%</p>
                        </div>
                    </div> 
                </div>
                <div class="forecast-item">
                    <h2 class="forecast-day">${getDayOfWeek(data.days[4].datetime)}, ${data.days[4].datetime.slice(5).replace(/-/g, '\/')}</h2>
                    <div class="forecast-temp-item">
                        <img class="forecast-img" src="${getWeatherIcon(data.days[4].icon)}" alt="${data.days[4].icon}">
                        <h3 class="forecast-maintemp">${data.days[4].temp}°</h3>
                    </div>                         
                    <h5 class="forecast-desc">${data.days[4].conditions}</h5>
                    <div class="temp-data">
                        <div class="forecast-dataItem">
                            <p>Min Temp:</p><p>${data.days[4].tempmin}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Max Temp:</p><p>${data.days[4].tempmax}°</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>Humidity:</p><p>${data.days[4].dew}</p>
                        </div>
                        <div class="forecast-dataItem">
                            <p>% of Rain:</p><p>${data.days[4].precipprob}%</p>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>`



}