const global = require('./GlobalData');
const gcID = require('./GetChannelID');


class Channel
{
    constructor(name, command_prefix = global.default_command_prefix, message_prefix = global.default_message_prefix, supermods = [], user_id = gcID.getChannelId(name))
    {
        this.name = name;
        this.command_prefix = command_prefix;
        this.message_prefix = message_prefix;
        this.supermods = supermods;
        this.user_id = user_id;
    }

    toString() 
    {
        return 'Channel: ' + this.name + 
             ' ⠀ ⠀ ⠀ ⠀ ⠀ ⠀ Cmd Prefix: ' + this.command_prefix +
             ' ⠀ ⠀ ⠀ ⠀ ⠀ ⠀ Msg Prefix: ' + this.message_prefix +
             ' ⠀ ⠀ ⠀ ⠀ ⠀ ⠀ Supermods: ' + this.supermods +
             ' ⠀ ⠀ ⠀ ⠀ ⠀ ⠀ User ID: ' + this.user_id;
    }
}


module.exports =
{
    Channel,
}