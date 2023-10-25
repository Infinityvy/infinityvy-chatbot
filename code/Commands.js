const { PartChannel } = require('./commands/PartChannel');
const { GetChannel } = require('./commands/GetChannel');
const { JoinChannel } = require('./commands/JoinChannel');
const { PeepoChat } = require('./commands/PeepoChat');
const { Ping } = require('./commands/Ping');
const { SetCommandPrefix } = require('./commands/SetCommandPrefix');
const { SetMessagePrefix } = require('./commands/SetMessagePrefix');
const { Vanish } = require('./commands/Vanish');
const { Say } = require('./commands/Say');
const { AddUltramod } = require('./commands/AddUltramod');
const { RemoveUltramod } = require('./commands/RemoveUltramod');

const commands =
[
    new PartChannel(),
    new GetChannel(),
    new JoinChannel(),
    new PeepoChat(),
    new Ping(),
    new SetCommandPrefix(),
    new SetMessagePrefix(),
    new Vanish(),
    new Say(),
    new AddUltramod(),
    new RemoveUltramod(),
];

function checkForCmdAndRunIt(client, channelObj, userinfo, message)
{
    for (let i = 0; i < commands.length; i++)
    {
        if(commands[i].check(channelObj, userinfo, message)) 
        {
            commands[i].execute(client, channelObj, userinfo, message);
        }
    }
}

module.exports =
{
    checkForCmdAndRunIt,
}