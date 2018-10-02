let count = 0;
$(document).ready(function () {
    $(document).keypress(function () {
        setRandomColor();
        randomWords();
    });
    // $(document).click(function () {
    //     setRandomColor();
    //     randomWords();
    // });
    // $(document).on({
    //     'touchend': function () {
    //         setRandomColor();
    //         randomWords();
    //     }
    // });
    // $(document).on("tap", function () {
    //     setRandomColor();
    //     randomWords();
    // });
    $(document).on("swipeleft", function () {
        setRandomColor();
        randomWords();
    });

});

function toStringRBG(myString) {
    return "rgb(" + myString[0] + ", " + myString[1] + ", " + myString[2] + ")";
}

function setRandomColor() {
    var myBackground = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    var myForeground = [0, 0, 0];
    if (0.299 * myBackground[0] + 0.587 * myBackground[1] + 0.114 * myBackground[2] <= 128)
        myForeground = [255, 255, 255];
    $("#colorpad").css("background", toStringRBG(myBackground));
    $("#colorpad").css("color", toStringRBG(myForeground));
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}

function getMinTime(from, to) {
    let min = Words[from].time;
    for (i = from; i <= to; ++i)
        if (Words[i].time < min) {
            min = Words[i].time;
        }
    return min;
}

function isDone(from, to) {
    return getMinTime(from, to) > 0;
}


const from = parseInt($.urlParam('from'), 10) || 0;
const to = parseInt($.urlParam('to'), 10) || Words.length - 1;
const type = $.urlParam('type') || 'none';

function randomWords() {
    let myNumber = Math.floor(Math.random() * (to - from + 1)) + from;

    while (Words[myNumber].time > getMinTime(from, to)) {
        myNumber = Math.floor(Math.random() * (to - from + 1)) + from;
    }
    document.getElementsByTagName("p")[0].innerHTML = "Press any key to random<br />" + count++ + " times - " + myNumber + " in [" + from + "; " + to + "] - " + ++Words[myNumber].time + " times for this word<br />DONE " + getMinTime(from, to) + " TIMES";

    if (type == 'english|kanji') {
        document.getElementById("box").innerHTML = Words[myNumber].meaning + "<br />" + Words[myNumber].kanji;
        document.getElementById("small").innerHTML = Words[myNumber].kana;
    } else if (type == 'english') {
        document.getElementById("box").innerHTML = Words[myNumber].meaning;
        document.getElementById("small").innerHTML = Words[myNumber].kana;
    } else if (type == 'kana|kanji') {
        document.getElementById("box").innerHTML = Words[myNumber].kanji + "<br />" + Words[myNumber].kana;
        document.getElementById("small").innerHTML = Words[myNumber].meaning;
    } else {
        document.getElementById("box").innerHTML = Words[myNumber].kana;
        document.getElementById("small").innerHTML = Words[myNumber].meaning;
    }
    var width = $('#box').width(),
        html = '<p id="content" style="overflow:hidden;white-space:nowrap;padding:0;margin:0;"></p>',
        line = $('#box').wrapInner(html).children()[0],
        FontSize = 200;
    document.getElementById('box').style.fontSize = FontSize + "px";
    while (document.getElementById('content').scrollWidth > document.getElementById('box').scrollWidth) {
        FontSize--;
        document.getElementById('box').style.fontSize = FontSize + "px";
    }
    $("#content").css("padding-top", ($('#box').height() - $("#content").height()) / 2 - 50);
}