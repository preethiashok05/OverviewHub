const mqtt = require('mqtt');
const mqttBrokerUrl = 'mqtt://localhost';
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Additional logic here
});

mqttClient.on('error', (error) => {
  console.error('Error connecting to MQTT broker:', error);
});

mqttClient.on('close', () => {
  console.log('Connection to MQTT broker closed');
});

mqttClient.on('offline', () => {
  console.log('MQTT client is offline');
});

mqttClient.on('message', (topic, message) => {
  console.log('Received message:', topic, message.toString());
  // Handle the received message
});

mqttClient.on('packetsend', (packet) => {
  console.log('Sent packet:', packet);
});

module.exports = mqttClient;