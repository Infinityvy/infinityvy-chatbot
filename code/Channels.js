const ch = require('./Channel');
const global = require('./GlobalData');
const logger = require('./Logger');

var channels = [];


function findChannelIndex(name)
{
    let low = 0;
    let high = channels.length - 1;

    while(low <= high)
    {
        const mid = Math.floor((low + high) / 2);
        if (channels[mid].name < name)
        {
            low = mid + 1;
        }
        else if(channels[mid].name > name)
        {
            high = mid - 1;
        }
        else
        {
            return mid;
        }
    }

    return null;
}

function getChannel(name)
{
    const channelIndex = findChannelIndex(name);
    if(channelIndex != null) return channels[channelIndex];
    else 
    {
        logger.Log('Warning: Channel ' + name + ' not found. Called from: ' + global.currentChannel);
        return new ch.Channel('Not Found');
    }
}

function addChannel(name)
{
    name = name.toLowerCase();
    let low = 0;
    let high = channels.length - 1;

    while(low <= high)
    {
        const mid = Math.floor((low + high) / 2);
        if (channels[mid].name < name)
        {
            low = mid + 1;
        }
        else if(channels[mid].name > name)
        {
            high = mid - 1;
        }
        else
        {
            return false; // already added
        }
    }

    const channel = new ch.Channel(name);
    channels.splice(low, 0, channel);
    return true;
}

function removeChannel(name)
{
    const channelindex = findChannelIndex(name);
    if(channelindex != null) 
    {
        channels.splice(channelindex, 1);
        return true;
    }
    else return false;
}

function getChannelCommandPrefix(name)
{
    return getChannel(name).command_prefix;
}

function getChannelMessagePrefix(name)
{
    return getChannel(name).message_prefix;
}

function getUserLevelInChannel(channel, user)
{
    const globalLevel = global.getGlobalUserLevel(user);
    if(globalLevel > 0) return globalLevel;
    else if(channel == user) return 20;
    else if(getChannel(channel).supermods.includes(user)) return 10;
    else return 0;
}

module.exports =
{
    channels,
    findChannelIndex,
    getChannel,
    addChannel,
    removeChannel,
    getChannelCommandPrefix,
    getChannelMessagePrefix,
    getUserLevelInChannel,
}