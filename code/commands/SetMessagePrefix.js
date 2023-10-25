const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const SaveFileManager = require('../SaveFileManager');
const cs = require('../ClientSay');

class SetMessagePrefix //local message prefix
{
    commandString = 'set message prefix ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
           userinfo.userlevel >= ul.supermod) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        channelObj.message_prefix = message.substring(channelObj.command_prefix.length + this.commandString.length).trim() + ' ';
        cs.Say(client, channelObj, channelObj.message_prefix + 'New message prefix set to \'' + channelObj.message_prefix + '\'.');

        SaveFileManager.writeChannelsToFile();
    }
}

module.exports =
{
    SetMessagePrefix,
}