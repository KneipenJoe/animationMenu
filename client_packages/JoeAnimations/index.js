let animation_browser = mp.browsers.new("package://JoeAnimations/browser/index.html");
let isReady = false;


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

