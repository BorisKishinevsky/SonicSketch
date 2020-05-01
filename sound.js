var checkForLoad = countLoaded();

function preloadAudio() {
    var dfd = jQuery.Deferred();
    for (var key of Object.keys(soundFiles)) {
        var audio = new Audio();
        // once this file loads, it will call loadedAudio()
        // the file will be kept by the browser as cache
        audio.addEventListener('canplaythrough', () => checkForLoad(dfd), false);
        audio.src = `data/${soundFiles[key]}`;
        audio.load()
    }

    return dfd.promise();
}

function countLoaded() {
    var count = 1;
    return function (dfd) {
        //console.log(count)
        if (count++ == Object.keys(soundFiles).length) {
            dfd.resolve("loaded")
        }
    }
}

function playSound(note) {
    var soundFile = soundFiles[note]
    if (soundFile) {
        var audio = new Audio(`data/${soundFile}`);
        audio.play();
    }
}
