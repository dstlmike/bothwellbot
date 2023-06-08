exports.debug = process.env.DEBUG || false;
exports.botMod = "10241176";
exports.bot_owner = {
  name: process.env.BOT_OWNER_NAME,
  id:   process.env.BOT_OWNER_ID,
  access_token: process.env.BOT_ACCESS_TOKEN
};

var botName = "BothwellBot";
exports.botName = process.env.BOT_NAME;

exports.bots = {
  BothwellBot: process.env.BOT_ID
  };
  
/*
if (botName == 'BothwellBot') {
  exports.bot_name = 'BothwellBot';
  exports.bots = {
    BothwellBot : process.env.BOT_ID
    }
}
/*
    raw : process.env.RAW_BOT_ID,
    ral : process.env.RAL_BOT_ID,
    fo0 : process.env.FO0_BOT_ID,
    ralv: process.env.RALV_BOT_ID,
    rar : process.env.RAR_BOT_ID,
    rabb: process.env.RABB_BOT_ID,
    bmc : process.env.BMC_BOT_ID,
    hp  : process.env.HP_BOT_ID,
    th10: process.env.TH10_BOT_ID
  };
} else if (botName == 'dark') {
  exports.bot_name = 'Reddit Dark Bot';
  exports.bots = {
    bffs   : process.env.BFFS_BOT_ID,
    testing: process.env.TESTING_BOT_ID,
    darkwar: process.env.DARKWAR_BOT_ID
  };
} else if (botName =='clive') {
  exports.bot_name = 'Chicago Live Bot';
  exports.bots = {
    clive : process.env.CLIVE_BOT_ID
  }
} else if (botName == 'clpub') {
  exports.bot_name = 'Chicago Live Bot';
  exports.bots = {
    clpub : process.env.CLPUB_BOT_ID
  }
}
*/
exports.delay_time = 1000;
