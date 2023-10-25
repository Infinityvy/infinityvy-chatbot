const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const cs = require('../ClientSay');

class GetChannel
{
    commandString = 'channel get ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
           userinfo.userlevel >= ul.pleb) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        const channel_name = message.substring(channelObj.command_prefix.length + this.commandString.length).trim();
        cs.Say(client, channelObj, channelObj.message_prefix + Chnls.getChannel(channel_name));
    }
}

module.exports =
{
    GetChannel,
}