const mqttClient = require('../config/mqtt');


const recieve = () =>{
    mqttClient.subscribe('admin/msg');
    mqttClient.on('message' , (topic , msg) =>{
        console.log(topic);
        console.log(msg);
    })
}

recieve();