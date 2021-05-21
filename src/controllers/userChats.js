const Message = require('../modals/message.js');

async function getOutboundMessages(to, from) {
  try {
    const messages = await Message.find({ to: to, from: from }, null, {sort: {created_at: 1}});
    return messages;
  } catch (error) {
    console.log('Error retrieving outbound messages', error);
  }
}
async function getInboundMessages(to, from) {
  try {
    return await Message.find({ from: from, to: to }, null, {sort: {created_at: 1}});
  } catch (error) {
    console.log('Error retrieving outbound messages', error);
  }
}

async function getAndCombineMessages(from, to) {
  let outboundMessages = await getOutboundMessages(from, to);
  let inboundMessages = await getInboundMessages(to, from);

  if (outboundMessages.length && inboundMessages.length)
    return inboundMessages
        .concat(outboundMessages)
        .sort((a, b) => a.created_at - b.created_at);
  else if (outboundMessages.length && inboundMessages.length == 0)
    return outboundMessages;
  else if (outboundMessages.length == 0 && inboundMessages.length)
    return inboundMessages;
  else return [];
}

async function saveMessage(message) {
  try {
    return await Message.create(message);
  } catch (error) {
    console.log('Could not add message', error);
  }
}

module.exports = {
  getAndCombineMessages,
  saveMessage,
};
