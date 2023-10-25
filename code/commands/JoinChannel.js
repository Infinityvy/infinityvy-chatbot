const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const SaveFileManager = require('../SaveFileManager');
const cs = require('../ClientSay');
const logger = require('../Logger');

class JoinChannel
{
    commandString = 'join ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
           userinfo.userlevel >= ul.owner) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        const channel_name = message.substring(channelObj.command_prefix.length + this.commandString.length).trim();

        if(Chnls.addChannel(channel_name))
        {
            client.join(channel_name).then(() => 
                {
                    logger.Log(`Joined ${channel_name}`);
                    cs.Say(client, channelObj, channelObj.message_prefix + 'Joined ' + channel_name);

                    SaveFileManager.writeChannelsToFile();
                })
                .catch((err) => 
                {
                    logger.Error(`Failed to join ${channel_name}: ${err}`);
                    cs.Say(client, channelObj, channelObj.message_prefix + 'Failed to join ' + channel_name);

                    Chnls.removeChannel(channel_name);
                });
        }
        else
        {
            cs.Say(client, channelObj, channelObj.message_prefix + 'Channel couldn\'t be added as it already is added.');
        }
    }
}

module.exports =
{
    JoinChannel,
}