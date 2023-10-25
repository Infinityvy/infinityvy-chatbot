const config = require('../data/config.json');
const logger = require('./Logger');

const colors = 
{
    infinityvy: '#4A9976',
    bot: '#B33741',
};

const options = {
    method: 'PUT',
    headers: {
      'Client-ID': config.helix_id,
      authorization: `Bearer ${config.helix_token}`
    }
  };


const changeColor = async (hexColor) =>
{
    try {
        const
          encodedColor = encodeURIComponent(hexColor);
        const url = `chat/color?user_id=${config.id}&color=${encodedColor}`;
        const response = await fetch('https://api.twitch.tv/helix/' + url, options);
        if (response.status !== 204) 
        { 
          logger.Error(await response.json()); 
        }
      } catch (e) {
        logger.Error(e);
      }
}

module.exports =
{
    colors,
    changeColor,
}