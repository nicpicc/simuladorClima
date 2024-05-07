// Importar módulo 'fs' para operaciones de archivo en Node.js
const fs = require('fs');

// Ruta al archivo JSON donde se almacenarán los datos
const jsonFilePath = './data/weather_history.json';

// Definir funciones constructoras para objetos User y WeatherReport
function User(name, city, tempPreference, humidityPreference, windPreference) {
    this.name = name;
    this.city = city;
    this.temperaturePreference = tempPreference;
    this.humidityPreference = humidityPreference;
    this.windPreference = windPreference;
}

function WeatherReport(temperature, humidity, wind, type, timestamp) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind = wind;
    this.type = type;
    this.timestamp = timestamp;
}

// Variables globales
let weatherHistory = [];
let currentUser; // Variable para almacenar el usuario actual

// Función para guardar el historial de simulaciones en el archivo JSON
function saveWeatherHistoryToFile() {
    const data = {
        user: {
            name: currentUser.name,
            city: currentUser.city,
            temperaturePreference: currentUser.temperaturePreference,
            humidityPreference: currentUser.humidityPreference,
            windPreference: currentUser.windPreference
        },
        simulations: weatherHistory
    };

    const jsonData = JSON.stringify(data, null, 2);

    try {
        fs.writeFileSync(jsonFilePath, jsonData);
        console.log('Historial de simulaciones guardado correctamente en el archivo JSON.');
    } catch (err) {
        console.error('Error al guardar el historial de simulaciones:', err);
    }
}

// Función para cargar el historial de simulaciones desde el archivo JSON al iniciar la aplicación
function loadWeatherHistoryFromFile() {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const parsedData = JSON.parse(jsonData);

        // Cargar información del usuario desde el archivo JSON
        currentUser = new User(
            parsedData.user.name,
            parsedData.user.city,
            parsedData.user.temperaturePreference,
            parsedData.user.humidityPreference,
            parsedData.user.windPreference
        );

        // Cargar historial de simulaciones desde el archivo JSON
        weatherHistory = parsedData.simulations.map(simulation => new WeatherReport(
            simulation.temperature,
            simulation.humidity,
            simulation.wind,
            simulation.type,
            simulation.timestamp
        ));

        console.log('Historial de simulaciones cargado correctamente desde el archivo JSON.');
    } catch (err) {
        console.error('Error al cargar el historial de simulaciones:', err);
        // Si ocurre un error al cargar, se utilizará un historial vacío por defecto
        weatherHistory = [];
    }
}

// Llamada a la función para cargar el historial de simulaciones al iniciar la aplicación
loadWeatherHistoryFromFile();

// Función de orden superior para filtrar simulaciones
function filterSimulations(simulations, filterFunction) {
    return simulations.filter(filterFunction);
}

// Ejemplo de función de filtro: Simulaciones con temperatura superior a 25°C
function filterByTemperatureAbove25(simulation) {
    return simulation.temperature > 25;
}

// Función de orden superior para procesar simulaciones
function processSimulations(simulations, processFunction) {
    return simulations.map(processFunction);
}

// Ejemplo de función de procesamiento: Obtener tipo de clima y fecha formateada
function processSimulation(simulation) {
    return {
        type: simulation.type,
        formattedDate: new Date(simulation.timestamp).toLocaleDateString()
    };
}

// Función para generar una imagen animada (GIF) de una simulación de clima
function generateAnimatedImage(simulation) {
    const gif = new GIF({
        workers: 2,
        quality: 10
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Configurar dimensiones del canvas (ajusta según tus necesidades)
    canvas.width = 200;
    canvas.height = 200;

    // Dibujar simulación en el canvas (puedes adaptar esto según tus datos)
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar detalles de la simulación
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Temp: ${simulation.temperature}°C`, 10, 30);
    ctx.fillText(`Humidity: ${simulation.humidity}%`, 10, 60);
    ctx.fillText(`Wind: ${simulation.wind} km/h`, 10, 90);
    ctx.fillText(`Type: ${simulation.type}`, 10, 120);

    // Agregar fotograma al GIF
    gif.addFrame(canvas, { delay: 1000 }); // 1000 ms (1 segundo) de delay entre cada fotograma

    // Renderizar y mostrar el GIF en la interfaz
    gif.on('finished', function(blob) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.body.appendChild(img);
    });

    gif.render();
}

// Función para simular el clima y guardar el historial actualizado en el archivo JSON
function simulateWeather() {
    // Realizar simulaciones de clima...
    // (Código existente para simular el clima y agregar al historial)

    // Guardar el historial de simulaciones en el archivo JSON después de cada simulación
    saveWeatherHistoryToFile();

    // Mostrar imágenes animadas de cada simulación
    weatherHistory.forEach(simulation => {
        generateAnimatedImage(simulation);
    });

    // Mostrar las simulaciones en la interfaz (si es necesario)
    displayWeatherHistory();
}

// Función para mostrar el historial de simulaciones en la interfaz
function displayWeatherHistory() {
    const historyDisplay = document.querySelector('.history');
    historyDisplay.innerHTML = '';

    processSimulations(weatherHistory, processSimulation).forEach((processedSimulation, index) => {
        const simulationInfo = `
            <div class="simulation-info">
                <p>Simulación ${index + 1}:</p>
                <p>Tipo de Clima: ${processedSimulation.type}</p>
                <p>Fecha: ${processedSimulation.formattedDate}</p>
            </div>
        `;
        historyDisplay.innerHTML += simulationInfo;
    });
}

// Lógica de inicio de sesión al cargar la página
function login() {
    currentUser = new User('Juan', 'Ciudad de México', 'neutral', 'neutral', 'neutral');
    simulateWeather(); // Simular clima automáticamente al iniciar sesión
}

// Llamar a la función de login al cargar la página
login();
