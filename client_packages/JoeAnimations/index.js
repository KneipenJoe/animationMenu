let animation_browser = mp.browsers.new("package://JoeAnimations/browser/index.html");
let isReady = false;
let localPlayer = mp.players.local;

mp.events.add('browserDomReady', (browser) => {
    if(browser != animation_browser) {
        return;
    }

    isReady = true;
});

mp.keys.bind(0x71, true, function() {
    if(!isReady) {
        return;
    }

    animation_browser.execute("animMen.toggle();");
});

mp.events.add({

    'Joe_WantStopAnimation': () => {
        mp.gui.chat.push("[Joe] stopped animation!");
        localPlayer.clearTasks();
    },

    'Joe_WantPlayAnimation': (displayname, dict, group, flag) => {
        mp.game.streaming.requestAnimDict(dict);
        while (!mp.game.streaming.hasAnimDictLoaded(dict)) mp.game.wait(0);
        mp.gui.chat.push("[Joe] plays animation: " + displayname);
        localPlayer.taskPlayAnim(dict, group, 4, 4, -1, flag, 1.0, false, false, false);
    },

    'Joe_ErrorMessage': (message) => {
        mp.gui.chat.push(`[Joe] ${message}`);
    }
})

