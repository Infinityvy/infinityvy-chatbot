const default_command_prefix = '>';
const default_message_prefix = '/me PopNemo ';


var owners = ['infinityvy'];
var ultramods = [];
var currentChannel = '';

function getGlobalUserLevel(user)
{
    user = user.toLowerCase();
    if(owners.includes(user)) return 40;
    else if(ultramods.includes(user)) return 30;
    else return 0;
}

module.exports =
{
    default_command_prefix,
    default_message_prefix,
    owners,
    ultramods,
    currentChannel,
    getGlobalUserLevel,
}