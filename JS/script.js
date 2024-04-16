// Array para almacenar historial de simulaciones
let weatherHistory = [];

function simulateWeather() {
    // Obtener los valores de los controles
    const temperature = parseInt(document.getElementById('temperature').value);
    const humidity = parseInt(document.getElementById('humidity').value);
    const wind = parseInt(document.getElementById('wind').value);

    // Simular el clima (puedes implementar lógica más compleja aquí)
    const weatherSimulation = {
        temperature: temperature,
        humidity: humidity,
        wind: wind
    };

    // Agregar la simulación al historial
    weatherHistory.push(weatherSimulation);

    // Mostrar todas las simulaciones en la interfaz
    displayWeatherHistory();
}

function displayWeatherHistory() {
    // Obtener el elemento donde se mostrará el historial
    const historyDisplay = document.querySelector('.history');

    // Limpiar contenido previo
    historyDisplay.innerHTML = '';

    // Mostrar cada simulación en el historial
    weatherHistory.forEach((simulation, index) => {
        const simulationInfo = `
            <div class="simulation-info">
                <p>Simulación ${index + 1}:</p>
                <p>Temperatura: ${simulation.temperature}°C</p>
                <p>Humedad: ${simulation.humidity}%</p>
                <p>Viento: ${simulation.wind} km/h</p>
            </div>
        `;
        historyDisplay.innerHTML += simulationInfo;
    });
}
