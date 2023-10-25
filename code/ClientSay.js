const tmi = require('tmi.js');
const ChCol = require('./ChangeColor');

function Say(client, channelObj, message)
{
    ChCol.changeColor(ChCol.colors['bot']);
    setTimeout(() => {client.say('#' + channelObj.name, message)}, 100);
    setTimeout(() => {ChCol.changeColor(ChCol.colors['infinityvy'])}, 200);
}

module.exports =
{
    Say,
}