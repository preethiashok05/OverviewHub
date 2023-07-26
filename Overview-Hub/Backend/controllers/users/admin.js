const mqttClient = require('../../config/mqtt');
const AdminMessages = require('../../models/UserHandle/AdminMessages');

const sendMsg = async (req, res) => {
  const { message, topic, saveToDB } = req.body;

  try {
    // Publish message using MQTT
    mqttClient.publish(topic, message);

    console.log(message);

    if (saveToDB) {
      // Check if there is an existing document with the same topic
      let adminMessage = await AdminMessages.findOne({ 'messages.topic': topic });

      if (adminMessage) {
        // If an existing document is found, add the message to its messages array
        adminMessage.messages.find((msg) => msg.topic === topic).messages.push(message);
      } else {
        // If no existing document is found, create a new document with the topic and add the message
        adminMessage = new AdminMessages({
          messages: [
            {
              topic,
              messages: [message]
            }
          ]
        });
      }

      // Save the document to the database
      await adminMessage.save();
    }

    res.send();
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
};

module.exports = { sendMsg };
