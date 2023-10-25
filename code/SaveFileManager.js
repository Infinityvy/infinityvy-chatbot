const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const ch = require('./Channel');
const Channels = require('./Channels');
const logger = require('./Logger');
const global = require('./GlobalData');

function writeChannelsToFile()
{
  logger.Log('Saving channels...');
  const channelsInXMLStructure = 
  {
    channels: 
    {
      channel: Channels.channels.map((channel) => (
      {
        name: channel.name,
        command_prefix: channel.command_prefix,
        message_prefix: channel.message_prefix,
        supermods: channel.supermods,
        user_id: channel.user_id,
      })),
    },
  };

  const xmlBuilder = new XMLBuilder();
  const channelsAsXMLData = xmlBuilder.build(channelsInXMLStructure, { header: true, attributes: false});
  fs.writeFileSync('data/channels.xml', channelsAsXMLData, 'utf8');
  logger.Log('Saved channels.');
}

function loadChannelsFromFile()
{
    const xmlParser = new XMLParser();
    const xmlChannelsData = fs.readFileSync('data/channels.xml', 'utf8');
    const parsedData = xmlParser.parse(xmlChannelsData);

    if (parsedData.channels && parsedData.channels.channel) 
    {
        const channelArray = Array.isArray(parsedData.channels.channel)
          ? parsedData.channels.channel
          : [parsedData.channels.channel];

        channelArray.forEach(channelData => 
        {
            Channels.channels.push(new ch.Channel(channelData.name, channelData.command_prefix, channelData.message_prefix + ' ', channelData.supermods));
        });

        logger.Log('----------------------\nChannels loaded:');
        console.log(Channels.channels);
        logger.Log('----------------------');
    }
    else
    {
      logger.Error('No channel data found in XML fle.');
    }
}

function writeUltramodsToFile()
{
  logger.Log('Saving ultramods...');
  const ultramodsInXMLStructure =
  {
    ultramods: global.ultramods,
  }

  const xmlBuilder = new XMLBuilder();
  const ultramodsAsXMLData = xmlBuilder.build(ultramodsInXMLStructure, { header: true, attributes: false});
  fs.writeFileSync('data/ultramods.xml', ultramodsAsXMLData, 'utf8');
  logger.Log('Saved ultramods.')
}

function loadUltramodsFromFile()
{
  const xmlParser = new XMLParser();
  const ultramodsAsXMLData = fs.readFileSync('data/ultramods.xml', 'utf8');
  const parsedData = xmlParser.parse(ultramodsAsXMLData);

  if(parsedData.ultramods)
  {
    parsedData.ultramods.forEach(umod =>
      {
        global.ultramods.push(umod);
      });

    logger.Log('Loaded ultramods: ' + global.ultramods);
  }
  else
  {
    logger.Error('No ultramods data found in XML file')
  }
}

module.exports =
{
    writeChannelsToFile,
    loadChannelsFromFile,
    writeUltramodsToFile,
    loadUltramodsFromFile,
}