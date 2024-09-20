const temp = document.querySelector('.temp');

const grab = async () => {
    const request = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.0767&longitude=4.2986&current=temperature_2m');

    const response = await request.json(); 

    temp.innerHTML = `The Hague, ${response.current.temperature_2m}°C`
}

grab()