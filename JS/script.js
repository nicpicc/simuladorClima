// Definir funciones constructoras para objetos User y WeatherReport
const User = (name, city, tempPreference, humidityPreference, windPreference) => ({
    name,
    city,
    temperaturePreference: tempPreference,
    humidityPreference: humidityPreference,
    windPreference: windPreference
});

const WeatherReport = (temperature, humidity, wind, type, timestamp) => ({
    temperature,
    humidity,
    wind,
    type,
    timestamp
});

// Variables globales
let weatherHistory = [];
let currentUser; // Variable para almacenar el usuario actual

// Función para guardar el historial de simulaciones en el archivo JSON
const saveWeatherHistoryToFile = () => {
    // Código para guardar el historial en el archivo JSON (omitido para simplificar)
    console.log('Historial de simulaciones guardado correctamente en el archivo JSON.');
};

// Función para cargar el historial de simulaciones desde el archivo JSON al iniciar la aplicación
const loadWeatherHistoryFromFile = () => {
    // Código para cargar el historial desde el archivo JSON (omitido para simplificar)
    console.log('Historial de simulaciones cargado correctamente desde el archivo JSON.');
};

// Función de orden superior para filtrar simulaciones
const filterSimulations = (simulations, filterFunction) => simulations.filter(filterFunction);

// Función de orden superior para procesar simulaciones
const processSimulations = (simulations, processFunction) => simulations.map(processFunction);

// Función para generar una imagen animada (GIF) de una simulación de clima
const generateAnimatedImage = simulation => {
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
    gif.on('finished', blob => {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);

        // Mostrar la imagen animada en la interfaz
        const historyDisplay = document.querySelector('.history');
        historyDisplay.appendChild(img);
    });

    gif.render();
};

// Función para simular el clima y mostrar resultados en la interfaz
const simulateWeather = () => {
    // Realizar simulaciones de clima...
    // (Código existente para simular el clima y agregar al historial)

    // Mostrar imágenes animadas de cada simulación en la interfaz
    const historyDisplay = document.querySelector('.history');
    historyDisplay.innerHTML = ''; // Limpiar el historial antes de mostrar las simulaciones

    weatherHistory.forEach((simulation, index) => {
        const simulationInfo = document.createElement('div');
        simulationInfo.classList.add('simulation-info');
        simulationInfo.innerHTML = `
            <p>Simulación ${index + 1}:</p>
            <p>Tipo de Clima: ${simulation.type}</p>
            <p>Fecha: ${new Date(simulation.timestamp).toLocaleDateString()}</p>
        `;
        historyDisplay.appendChild(simulationInfo);

        // Generar y mostrar la imagen animada de la simulación
        generateAnimatedImage(simulation);
    });

    // Mostrar las simulaciones en la interfaz (si es necesario)
    console.log('Simulaciones de clima mostradas en la interfaz.');
};

// Lógica de inicio de sesión al cargar la página
const login = () => {
    currentUser = User('Juan', 'Ciudad de México', 'neutral', 'neutral', 'neutral');
    simulateWeather(); // Simular clima automáticamente al iniciar sesión
};

// Llamar a la función de login al cargar la página
login();
