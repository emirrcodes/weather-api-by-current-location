import getCityNameByLocation from "./location_script.js";

document.addEventListener("DOMContentLoaded", async function (){
    const cityNameByLocation = await getCityNameByLocation();
    const cityName = cityNameByLocation; //no need to use ?.value?.trim()

    console.log("citynamee ", cityName);
    if(!cityName){
        console.error("Boş input girildi.");
        return;
    }

    async function get_weather(city) {
        const API_KEY = "6e283abad5500a582b5374809016d044"; 

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => {
                const hava_durumu = response.data.weather[0].description;
                const temp = response.data.main.temp;
                console.log("Tüm data: ", response.data);
                console.log("City: ", response.data.name);
                // console.log(response.data.main.name); invalid
                console.log("Hava Durumu: ", hava_durumu);
                console.log("Derece (Celcius): ", temp);

                document.getElementById("currCityh2").innerHTML = "Your City: " + response.data.name;
                document.getElementById("weatherResult").innerHTML = hava_durumu + " & " + temp + " °C";
                document.getElementById("iconId").src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
            })
            .catch(err => {
                document.getElementById("weatherResult").innerHTML = "Şehir bulunamadı veya API hatası oluştu.";
            });
    }
    
    get_weather(cityName);
});