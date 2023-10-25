
const config = require( './data/config.json');

const tmi = require('tmi.js');

const Channels = require('./code/Channels');
const SaveFileManager = require('./code/SaveFileManager');
const Commands = require('./code/Commands');
const global = require('./code/GlobalData');
const logger = require('./code/Logger');


SaveFileManager.loadChannelsFromFile();
SaveFileManager.loadUltramodsFromFile();

var opts = 
{
  identity: 
  {
    username: config.username,
    password: config.twitch_token,
  },
  channels: Channels.channels.map((channel) => channel.name),
};

const client = new tmi.Client(opts);


client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  global.currentChannel = channel;

  const channelObj = Channels.getChannel(channel.substring(1));

  const userinfo =
  {
    userstate: userstate,
    userlevel: Channels.getUserLevelInChannel(channel.substring(1), userstate['username'].toLocaleLowerCase()),
  }
  
  Commands.checkForCmdAndRunIt(client, channelObj, userinfo, message);
});

client.connect();


