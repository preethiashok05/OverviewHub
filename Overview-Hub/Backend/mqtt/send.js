const mqttClient = require('../config/mqtt');


const send = () =>{
    let message = "hello world";
    mqttClient.publish('admin/msg', message);
}
send();