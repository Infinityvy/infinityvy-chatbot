const tmi = require('tmi.js');
const Chnls = require('../Channels');
const cs = require('../ClientSay');

class Ping
{
    commandString = 'ping';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString)) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        cs.Say(client, channelObj, channelObj.message_prefix + 'Pong!');
    }
}

module.exports=
{
    Ping,
}