const tmi = require('tmi.js');
const Chnls = require('../Channels');
const cs = require('../ClientSay');
const ul = require('../UserLevel');
const logger = require('../Logger');

class Say
{
    commandString = 'say ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
        userinfo.userlevel >= ul.ultramod) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        const text = message.substring(channelObj.command_prefix.length + this.commandString.length);
        cs.Say(client, channelObj, channelObj.message_prefix + text);
    }
}

module.exports=
{
    Say,
}