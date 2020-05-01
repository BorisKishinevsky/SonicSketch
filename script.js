const gridSizeX = 50;
const cellSizeX = 100 / gridSizeX;

const gridSizeY = 25; //the canvas has a 2/1 screen size
const cellSizeY = 100 / gridSizeY;


const keyWidth = 45 / 8;
const keyHeight = 86;
const keyWidthBlack = keyWidth * .7;
const keyHeightBlack = keyHeight * .7;
var sequenceInterval;

var tempo = 50;

var currentNote = ''
var currentRow = 0;
var currentColumn = 0;
var isMouseDown = false;
var isTouchDown = false;

var instructionsVisible = true;
var notes_to_colors = {
    "lowF": "520000",
    "Gb": "740000",
    "G": "b30000",
    "Ab": "ee0000",
    "A": "ff6300",
    "Bb": "ffec00",
    "B": "99ff00",
    "C": "28ff00",
    "Db": "00ffe8",
    "D": "007cff",
    "Eb": "0500ff",
    "E": "4500ff",
    "highF": "57009e",
    "erase": "ffffff"
};
var soundFiles = {
    lowF: "Piano.mf.F4.mp3",
    Gb: "Piano.mf.Gb4.mp3",
    G: "Piano.mf.G4.mp3",
    Ab: "Piano.mf.Ab4.mp3",
    A: "Piano.mf.A4.mp3",
    Bb: "Piano.mf.Bb4.mp3",
    B: "Piano.mf.B4.mp3",
    C: "Piano.mf.C5.mp3",
    Db: "Piano.mf.Db5.mp3",
    D: "Piano.mf.D5.mp3",
    Eb: "Piano.mf.Eb5.mp3",
    E: "Piano.mf.E5.mp3",
    highF: "Piano.mf.F5.mp3"
}
whiteKeys = [
    "lowF",
    "G",
    "A",
    "B",
    "C",
    "D",
    "E",
    "highF"
];

blackKeys = [
    "Gb",
    "Ab",
    "Bb",
    "Db",
    "Eb"
]




$(init)





function init() {
    preloadAudio().then(() => {
        drawWhiteKeys()
        drawBlackKeys()
        drawGrid()

        setTimeout(() => listen(), 1000);
    })
}





function drawWhiteKeys() {
    for (i in whiteKeys) {
        if (i != 7) {
            var key = $("<div/>", {
                "id": whiteKeys[i],
                "class": "key"
            }).css({
                "left": `${1.5+(i*keyWidth)}%`,
                "top": `${7}%`,
                "width": `${keyWidth}%`,
                "height": `${keyHeight}%`,
                "background-color": `#${notes_to_colors[whiteKeys[i]]}`
            })
            $('#keyboard').append(key)

        } else { //make last key less wide
            var key = $("<div/>", {
                "id": whiteKeys[i],
                "class": "key"
            }).css({
                "left": `${1.5+(i*keyWidth)}%`,
                "top": `${7}%`,
                "width": `${.8*keyWidth}%`,
                "height": `${keyHeight}%`,
                "background-color": `#${notes_to_colors[whiteKeys[i]]}`
            })
            $('#keyboard').append(key)

        }
    }
}


function drawBlackKeys() {
    for (i in blackKeys) {
        j = i;
        if (i > 2) j = parseInt(i) + 1
        var key = $("<div/>", {
            "id": blackKeys[i],
            "class": "key"
        }).css({
            "left": `${2.4+(j*keyWidth+keyWidth*.5)}%`,
            "top": `${7}%`,
            "width": `${ keyWidthBlack}%`,
            "height": `${keyHeightBlack}%`,
            "background-color": `#${notes_to_colors[blackKeys[i]]}`
        })
        $('#keyboard').append(key)

    }
}

function drawGrid() {
    for (i = 0; i < gridSizeX; i++) {
        for (j = 0; j < gridSizeY; j++) {

            var cell = $("<div/>", {
                "id": `Cell${i}_${j}`,
                "class": "cell"
            }).css({
                "left": `${i*cellSizeX}%`,
                "top": `${j*cellSizeY}%`,
                "width": `${cellSizeX}%`,
                "height": `${cellSizeY}%`

            })
            $('#grid').append(cell)

        }
    }
}

function clearGrid() {
    for (i = 0; i < gridSizeX; i++) {
        for (j = 0; j < gridSizeY; j++) {
            $(`#Cell${i}_${j}`).css({
                "background-color": "white"
            }).data("note", "");
        }
    }
}


function listen() {


    $('#playButton').on("click", playCell)

    $("body").on('keypress', (evt) => {
        if (evt.code == "Space") {
            clearGrid();
        }

    });

    $("#grid").on("mousedown", () => {
        if (instructionsVisible) {
            instructionsVisible = false;
            console.log("no more instructions!")
            $("#instructions").css({
                'opacity': 0.0
            });
            $("#instructions").css({
                'z-index': -1
            });
        }
    })

    $('#myRange').on("change", function () {
        tempo = $(this).val();
        if (tempo >= 1 && tempo <= 10) {
            $('#demo').text("Prestissimo");
            $('#tempoText').css("left", "34%");
        } else if (tempo > 10 && tempo <= 20) {
            $('#demo').text("Presto");
            $('#tempoText').css("left", "42%");
        } else if (tempo > 20 && tempo <= 30) {
            $('#demo').text("Vivace");
            $('#tempoText').css("left", "41%");
        } else if (tempo > 30 && tempo <= 40) {
            $('#demo').text("Allegro");
            $('#tempoText').css("left", "41%");
        } else if (tempo > 40 && tempo <= 50) {
            $('#demo').text("Allegretto");
            $('#tempoText').css("left", "37%");
        } else if (tempo > 50 && tempo <= 60) {
            $('#demo').text("Moderato");
            $('#tempoText').css("left", "37%");
            $('#tempoText').css("left", "37%");
        } else if (tempo > 60 && tempo <= 70) {
            $('#demo').text("Andante");
            $('#tempoText').css("left", "41%");
        } else if (tempo > 70 && tempo <= 80) {
            $('#demo').text("Adagio");
            $('#tempoText').css("left", "42%");
        } else if (tempo > 80 && tempo <= 90) {
            $('#demo').text("  Largo");
            $('#tempoText').css("left", "43%");
        } else if (tempo > 90) {
            $('#demo').text("  Grave");
            $('#tempoText').css("left", "42%");
        }
        //$('#demo').text(tempo);


        // console.log(tempo)
    })

    $('html').on("mousedown", () => {
        isMouseDown = true
        //console.log(isMouseDown)
    })

    $('html').on("mouseup", () => {
        isMouseDown = false
        //console.log(isMouseDown)
    })


    $('html').on("touchstart", () => {
        isTouchDown = true
        console.log(isTouchDown)
    })

    $('html').on("touchend", () => {
        isTouchDown = false
        console.log(isTouchDown)
    })


    $('.key').on("mousedown", function () {
        console.log("playing sound")
        playSound(this.id)
        currentNote = this.id;
    })

    $('#eraser').on("mousedown", function () {
        //console.log("erase")

        currentNote = "erase";
    })

    $('#info').on("mousedown", function () {
        console.log("infobutton");
        if (!instructionsVisible) {
            instructionsVisible = true;
            $("#instructions").css({
                'opacity': 1
            });
            $("#instructions").css({
                'z-index': 2
            });
        } else {
            instructionsVisible = false;
            $("#instructions").css({
                'opacity': 0
            });
            $("#instructions").css({
                'z-index': -1
            });
        }

    })

    $('.cell').on("mousedown mouseenter touchstart touchmove", function (evt) {
        console.log(evt.type)
        clearInterval(sequenceInterval);
        if (isMouseDown || evt.type == "mousedown" || isTouchDown || evt.type == "touchmove") {
            $(this).css({
                "background-color": `#${notes_to_colors[currentNote]}`
            }).data("note", currentNote)
        }
    })



}

function playCell() {
    console.log("playCell activated")
    clearInterval(sequenceInterval);
    $("#button").attr("src", "data/soundButton.png")
    console.log("The tempo is " + tempo);
    sequenceInterval = setInterval(makeNoise, tempo)

}

function makeNoise() {

    var note = $(`#Cell${currentRow}_${currentColumn}`).data("note")
    if (note) {
        playSound(note)
    }
    currentRow++
    if (currentRow > gridSizeX) {
        currentRow = 0
        currentColumn++
    }
    if (currentColumn > gridSizeY) {
        currentRow = 0;
        currentColumn = 0;
        clearInterval(sequenceInterval);
        $("#button").attr("src", "data/playButton.png");

    }


}
