const tmi = require('tmi.js');
const Chnls = require('../Channels');
const ul = require('../UserLevel');
const SaveFileManager = require('../SaveFileManager');
const cs = require('../ClientSay');
const logger = require('../Logger');

class PartChannel
{
    commandString = 'part ';

    check(channelObj, userinfo, message)
    {
        if(message.startsWith(channelObj.command_prefix + this.commandString) &&
           userinfo.userlevel >= ul.owner) return true;
        else return false;
    }

    execute(client, channelObj, userinfo, message)
    {
        const channel_name = message.substring(channelObj.command_prefix.length + this.commandString.length).trim();

        if(Chnls.removeChannel(channel_name))
        {
            client.part(channel_name).then(() => 
                {
                    logger.Log(`Departed from ${channel_name}`);
                    cs.Say(client, channelObj, channelObj.message_prefix + 'Parted from ' + channel_name);

                    SaveFileManager.writeChannelsToFile();
                })
                .catch((err) => 
                {
                    logger.Error(`Failed to part from ${channel_name}: ${err}`);
                    cs.Say(client, channelObj, channelObj.message_prefix + 'Failed to part from ' + channel_name);

                    Chnls.addChannel(channel_name);
                });
        }
        else
        {
            cs.Say(client, channelObj, channelObj.message_prefix + 'Couldn\'t part channel ' + channel_name + ' as it is not joined.');
        }
    }
}

module.exports =
{
    PartChannel,
}