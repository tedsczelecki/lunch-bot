const { addMessage } = require('../../api/messages/controller');

const logMessage = async (message, direction = 'incoming') => {
  const _message = {
    ...message,
    direction,
  };
  delete _message.ts;
  console.log(_message);
  return await addMessage({body: _message});
};

module.exports = {
  logMessage,
};
