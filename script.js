let currentLocation=document.querySelector('.curr-location')
let tempCount=document.querySelector('#curr-temp-count')
let weatherDescription=document.querySelector('.js-weather-dec')
let weatherImage=document.querySelector('#weather-image')
let minTemp=document.querySelector('.min-temp')
let maxTemp=document.querySelector('.max-temp')
let humidityCount=document.querySelector('.humidity-count')
let humidityBarValue=document.querySelector('.humidity-value')

const apikey='7b44ef8be9d664b20428d4d35a805526'

document.querySelector('.js-search-button').addEventListener('click',getWeatherDetails)
async function getWeatherDetails(){
    const location=document.querySelector('.city-input').value
    console.log(location)
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`)
        const data= await response.json()
        console.log(data)
        UpdateWeatherDetails(data.weather[0])
        UpdateCurrentTemperature(data.main)
        UpdateCurrentLocation(data.name,data.sys.country)
        UpdateHumidity(data.main)
    }catch(error){
        console.log(error)
    }
}

function UpdateCurrentLocation(cityName,country){
    currentLocation.value=`${cityName}, ${country}`
}

function UpdateCurrentTemperature(tempObj){
    tempCount.innerText=Math.floor(tempObj.temp- 273.15)
    minTemp.innerText=Math.floor(tempObj.temp_min-273.15)
    maxTemp.innerText=Math.floor(tempObj.temp_max-273.15)
    

}

function UpdateWeatherDetails(weather){
    weatherDescription.innerText=(weather.description).toUpperCase()
    weatherImage.src=`http://openweathermap.org/img/wn/${weather.icon}.png`    
}

function UpdateHumidity(tempObj){
    humidityCount.innerText=`${tempObj.humidity}%`
    let bgColor=tempObj.humidity<=30?'blue':tempObj.humidity>30 && tempObj.humidity<=60?'Green':'red'
    humidityBarValue.style.width=`${tempObj.humidity}%`
    humidityBarValue.style.backgroundColor=bgColor
}