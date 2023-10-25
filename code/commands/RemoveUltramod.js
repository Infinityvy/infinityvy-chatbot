const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const cs = require('../ClientSay');
const global = require('../GlobalData');
const logger = require('../Logger');
const SaveFileManager = require('../SaveFileManager');

class RemoveUltramod
{
    commandString = 'unumod ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
           userinfo.userlevel >= ul.owner) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        const channel_name = message.substring(channelObj.command_prefix.length + this.commandString.length).trim().toLowerCase();
        if(global.ultramods.includes(channel_name)) 
        {
            global.ultramods = global.ultramods.filter(umod => umod !== channel_name);
            logger.Log('Removed ' + channel_name + ' as an ultramod.');
            cs.Say(client, channelObj, channelObj.message_prefix + 'Removed ' + channel_name + ' as an ultramod.');
            SaveFileManager.writeUltramodsToFile();
        }
        else
        {
            logger.Log('Couldn\'t remove ' + channel_name + ' as an ultramod. Not an ultramod.');
            cs.Say(client, channelObj, channelObj.message_prefix + 'Couldn\'t remove ' + channel_name + ' as an ultramod. Not an ultramod.');
        }
    }
}

module.exports =
{
    RemoveUltramod,
}