function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toString();
                const lng = position.coords.longitude.toString();
                console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                resolve([lat, lng]);
            },
            (error) => {
                console.warn(`ERROR(${error.code}): ${error.message}`);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    });
}

// Step 2: Get city name from coordinates
function getCity(coordinates) {
    return new Promise((resolve, reject) => {
        const [lat, lng] = coordinates;
        const xhr = new XMLHttpRequest();
        const L_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
        const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.aa2e3de3479fd1f9d4c2f178d2b0d7de&lat=${lat}&lon=${lng}&format=json`;

        xhr.open("GET", url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const city = response.address.province || response.address.city || response.address.town;
                    console.log("City from API:", city);
                    resolve(city);
                } else {
                    reject("Şehir bilgisi alınamadı.");
                }
            }
        };
    });
}

// Export function to get city name by location
export default async function getCityNameByLocation() {
    try {
        const coordinates = await getCoordinates(); // Get coordinates
        const city = await getCity(coordinates);  // Get city from API
        return city;
    } catch (error) {
        console.error("Hata oluştu:", error);
        return null;
    }
}