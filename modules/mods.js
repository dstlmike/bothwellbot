var mods = [];
var rooms = [];
var config = require('../config/config.js');
var db = require('./db.js');
var modCommands = [addModCmd, cmdConfig, listModsCmd];
var owner = process.env.BOT_OWNER_ID;
//init - make an init function
db.getMods(function(res){
  mods = res;
});
exports.modName = "Mod Control";

exports.checkCommands = function(dataHash, callback) {
  for (command in modCommands) {
    var test = modCommands[command](dataHash.request, dataHash.owner, callback);
    if (test)
      return test;
  }

  return false;
}

exports.getMods = function() {
  return mods;
}

exports.isMod = function(id) {
  for (mod in mods) {
    if (mods[mod].id == id)
      return true;
  
  if (config.botMod == id) 
   return true;
    }

  return false;
}

exports.getModIDs = function() {
  var ids = [];

  for (mod in mods) {
    ids.push(mods[mod].id);
  }
  return ids;
}

exports.getModNames = getModNames;

exports.setMods = function(modHash) {
  mods = modHash;
}

exports.addMod = function(modHash) {
  mods.push(modHash);
}

exports.getCmdListDescription = function () {
  return [
    {cmd: "/mod add 'name' 'tag the user'", desc: "Owner command to add mods", owner: true},
    {cmd: "/mod list", desc: "List names of current mods"}
  ];
}

function getModNames(){
  var names = [];

  for (mod in mods) {
    names.push(mods[mod].name);
  }
  return names;
}

function cmdConfig(request, currentBot, owner, callback) {

  var regex = /^\/config (.+)/i;

  var reqText = request.text;

  if (regex.test(reqText)) {

    var val = regex.exec(reqText);

    if (rooms['config']){

      callback(true, "You've already set a config ID. If you wish to reset it for some reason, you'll need to clear the database and start over.")

      return true;

    } else if (val[1].length != 26) {

      callback(true, "That's not the right length for a Bot ID", []);

      return true;

    }

    rooms['config'] = val[1];

    db.addMod({

      name: 'config',

      id: val[1]

    });

    db.addMod({

      config: 'owner',

      id: request.user_id

    });

    var msg = 'Config Bot ID is set.\n\nYou will be recognized as the bot owner as well as a moderator.\n\nYou can add the bot to additional rooms.\n-First create the bot at dev.groupme.com, like you did the Config bot.\n-Change the end of the callback url form config to something different with no spaces.\n-This new end of the callback url needs to be the same as the name you pick for the add room command in the next step and should be unique to your other bots. It does not need to be the same name you chose for the name of the bot at dev.groupme.com, it just needs to be something you will recognize should you need to make changes.\n-Last use the /room add command as follows:\n/room add <name matching the end of the callback url> <Bot ID>\nEX: /room add foo dV82tx6bA6cstUZX7ghY7aho3y\n\nThere is a list of commands available by typing /commands.';

    callback(true, msg, []);

    return msg;

  }

}


function addModCmd(request, dataHash, callback) {
  var regex = /^\/mod add (.+?) ([\s\S]+)/i;

  if (regex.test(request.text)) {
    if (request.user_id !=  "10241176") {
      callback(true, "You wish you could add mods", []);
      return "You wish you could add mods.";
    }

    if (!request.attachments[0].user_ids){
      callback(true, "You have to mention the user you want to mod using @");
      return "You have to mention the user you want to mod user @";
    }

    var val = regex.exec(request.text);
    val[2] = request.attachments[0].user_ids[0];
    db.findMod(val[1], function(res){
      if (res) {
        callback(true, "User already a mod", []);
      } else {
        var newMod = {name: val[1], id: val[2]};
        db.addMod(newMod);
        mods.push(newMod);
        callback(true, val[1] + " is now a mod.", []);
      }
    });
  } else {
    return false;
  }
}

function listModsCmd(request, owner, callback) {
  var regex = /^\/mod list$/;

  if (regex.test(request.text)) {
    var str = "Current mods are: "
    str += getModNames().toString().replace(/,/g, ', ');
    callback(true, str);
  }
}
