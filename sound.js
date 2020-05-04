var checkForLoad = countLoaded();
var ringLen = 5;
var audioRing = [];
var currentRingIndex = 0;
var firstSound = true;

for (var c = 0; c < ringLen; c++) {
    audioRing.push(new Audio());

}

var audio = new Audio();

function preloadAudio() {
    //    alert("preloud audio 1");
    //    alert("preloud audio 2");
    var dfd = $.Deferred();

    for (var key of Object.keys(soundFiles)) {
        // once this file loads, it will call loadedAudio()
        // the file will be kept by the browser as cache
        audio.addEventListener('canplaythrough', function () {
            checkForLoad(dfd)
        }, false);
        audio.src = `data/${soundFiles[key]}`;
        audio.load()
    }

    //    setTimeout(function () {
    //        dfd.resolve("resolved")
    //    }, 1000);

    return dfd;
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

    soundFile = soundFiles[note];
    if (firstSound) {
        for (var c = 0; c < ringLen; c++) {
            audioRing[c].src = `data/${soundFile}`;
            audioRing[c].load();
        }
        firstSound = false;
    }


    if (soundFile) {
        audioRing[currentRingIndex].src = `data/${soundFile}`;
        audioRing[currentRingIndex].load();

        //var audio = new Audio(`data/${soundFile}`);
        // alert(`${soundFile} inside playSound`);
        audioRing[currentRingIndex].play();
        currentRingIndex = (currentRingIndex + 1) % ringLen;
    }
}
