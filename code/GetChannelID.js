const config = require('../data/config.json');
const logger = require('./Logger');

/*
async function getChannelId(channelName) 
{
  const url = `https://api.twitch.tv/helix/`;

  console.log('Fetching UID for ' + channelName);
  try {
    const response = await fetch(url, {
      headers: {
        'Client-ID': config.helix_token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) 
      {
        console.log('... Fetched!');
        return data.data[0].id;
      }
    }
    throw new Error('Channel ID not found');
  } catch (error) {
    throw error;
  }
}
*/

const options = {
    headers: {
      'Client-ID': config.helix_id,
      authorization: `Bearer ${config.helix_token}`
    }
  };
  

const getChannelId = async (channelName) =>
{
  return null;
    logger.Log('Fetching UID for ' + channelName);
    try {
        const url = `users?login=${channelName}`;
        const response = await fetch(`https://api.twitch.tv/helix/` + url, options);
        //if (response.status !== 204) { console.error(await response.json()); }
        setTimeout(logger.Log(response), 1000);
        return response[0].data.id;
      } catch (e) {
        logger.Error(e);
      }

    logger.Log('Channel ' + channelName + ' not Found');
    return null;
}

module.exports =
{
    getChannelId,
}