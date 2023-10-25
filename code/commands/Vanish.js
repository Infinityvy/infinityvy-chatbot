const tmi = require('tmi.js');
const Chnls = require('../Channels');
const cs = require('../ClientSay');
//const logger = require('../Logger');

class Vanish
{
    commandString = 'vanish';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString)) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        logger.Log('Attempting to timeout ' + userinfo.userstate['username']);
        client.say('#' + channelObj.name, '/timeout ' + userinfo.userstate['username'] + ' 1');
    }
}

module.exports=
{
    Vanish,
}