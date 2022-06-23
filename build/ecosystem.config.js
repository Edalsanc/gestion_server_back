module.exports = {
    apps: [{
        name: "backend jobs-wplay", //Nombre de la aplicación
        script: "./index.js", //Script principal que va a correr la app
        watch: false, // Si esta en true se reinicia automaticamente cuando hay cambios, si es false toca reiniciar manualmente para que detecte los cambios
        max_memory_restart: '1000M', //Esta en constante vigilancia de los recursos de memoria ram si consume mas de 1000M se reiniciara.
        exec_mode: "cluster",
        instances: 1,
        cron_restart: "59 23 * * *", //El 59 son minutos el 23 es la hora, a las 11:59 se estara reiniciando esta app todos los días
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}