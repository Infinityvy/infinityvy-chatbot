const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const cs = require('../ClientSay');

class PeepoChat
{
    commandString = 'peepoChat ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(this.commandString) &&
           userinfo.userlevel >= ul.ultramod) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        cs.Say(client, channelObj, 'peepoChatbutpeepoisnotchatting');
    }
}

module.exports =
{
    PeepoChat,
}