const mqttClient = require('../../config/mqtt');
const RoleUsers = require('../../models/UserHandle/Clients');
const AdminMessages = require('../../models/UserHandle/AdminMessages');

let messages = [];

const getMessages = async (req, res) => {
  try {
    mqttClient.subscribe('admin/general');
    mqttClient.on('message', (topic, message) => {
      console.log('Received message:', message.toString());
      try {
        const parsedMessage = message.toString();
        messages.push(parsedMessage);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    });
    // Send the messages as a response after a certain period of time
    // setTimeout(() => {
      res.status(200).json({ messages });
    //}, 1000*6); // Adjust the delay as needed
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


const getUserTopicsAndMessages = async (req, res) => {
  const { username } = req.body;

  try {
    // Find the user in the RoleUsers collection
    const user = await RoleUsers.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { subscribedTopics } = user;

    // Fetch all available topics from AdminMessages
    const availableTopics = await AdminMessages.distinct('messages.topic');
    console.log("availableTopics" + availableTopics);
    // Fetch messages for the subscribed topics from AdminMessages
    const subscribedMessages = await AdminMessages.find({ 'messages.topic': { $in: subscribedTopics } });
    console.log("sub" + subscribedMessages);
    const messages = [];

    // Populate messages array with subscribed topics and their corresponding messages
    availableTopics.forEach((topic) => {
      const subscribedTopic = subscribedMessages.find((msg) => msg.messages[0].topic === topic);
      if (subscribedTopic) {
        messages.push(subscribedTopic);
      } else {
        messages.push({ messages: [{ topic, messages: [] }] });
      }
    });
    console.log(JSON.stringify(messages));
    res.status(200).json({messages:JSON.stringify(messages)});
  } catch (error) {
    console.error('Failed to fetch user topics and messages:', error);
    res.status(500).json({ error: 'Failed to fetch user topics and messages' });
  }
};

const updateSubscription = async (req, res) => {
  const { username, subscribeTopics, unsubscribeTopics } = req.body;

  try {
    // Find the user in the RoleUsers collection
    const user = await RoleUsers.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove topics from the unsubscribeTopics array
    unsubscribeTopics.forEach((topic) => {
      const index = user.subscribedTopics.indexOf(topic);
      if (index !== -1) {
        user.subscribedTopics.splice(index, 1);
      }
    });

    // Add topics from the subscribeTopics array
    subscribeTopics.forEach((topic) => {
      if (!user.subscribedTopics.includes(topic)) {
        user.subscribedTopics.push(topic);
      }
    });

    // Save the updated user document
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
};

module.exports = {  getMessages ,getUserTopicsAndMessages ,updateSubscription };