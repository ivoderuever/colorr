//global variables
var color = "#FD7579";
var backgroundColor = "#082837";
var menuOpen = false;
var lock = false;
var lock2 = false;
var locktrigger = false;
var locktrigger2 = false;
var overlay = false;
var screenshot = false;
var colorHistory = [["#FD7579","#082837"],["#FD7579","#082837"],["#FD7579","#082837"],["#FD7579","#082837"],["#FD7579","#082837"]];


//gives a random color code. like the function name already displays
function randomColor() {
    return "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });
}

//function to check the color and resturn if font color needs to be white or black
function getFontColorByBgColor(bgColor) {
    return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
}

$(document).ready(function () {

    //menu function
    function menu() {
        $('#menu').toggleClass('menu-icon-open');
        $('#menu').toggleClass('fa-times');
        $('.left-container').toggleClass('left-container-open');

        if ($('#menu').hasClass('menu-icon-open')) {
            menuOpen = true;
        } else {
            menuOpen = false;
        }
    }

    //menu button
    $("#menu").click(function () {
        menu()
    });

    //lock check
    function lockcheck() {
        if ($(".one-lock").hasClass("fa-lock")) {
            lock = true
        } else {
            lock = false;
        }

        if ($(".two-lock").hasClass("fa-lock")) {
            lock2 = true;
        } else {
            lock2 = false;
        }
    }

    //function to change all element that needs to be changed
    function giveRandomColor() {
        lockcheck();

        if (lock === false) {
            backgroundColor = randomColor().toUpperCase();
        }

        if (lock2 === false) {
            color = randomColor().toUpperCase();
        }

        change(color, backgroundColor);
        addcolorHistory(color, backgroundColor);
    }

    function change(color, backgroundColor) {
        $('.color').css("color", color);
        $('.background-color').css("background-color", backgroundColor);

        $('.one').css("background-color", backgroundColor).css("color", getFontColorByBgColor(backgroundColor)).children(".hexcode").text(backgroundColor);
        $('.two').css("background-color", color).css("color", getFontColorByBgColor(color)).children(".hexcode").text(color);
    }

    //when enter is pressed will run function giveRandomColor()
    $(document).keyup(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '32') {
            giveRandomColor();
        }

        if (keycode == '27') {
            if (menuOpen == true) {
                if ($(window).width() < 1000) {
                    menu()
                }
            }

            if (overlay == true) {
                $('.overlay-container').css("display", "none");
                $('.overlay').toggleClass('overlay-open')
                overlay = false;
    
                if (screenshot == true) {
                    cleanoverlay()
                    screenshot = false;
                }
    
            }
        }
    });

    $("#randomizeButton").click(function () {
        giveRandomColor();

        $('#rotation').toggleClass("icon-rotate");

        setTimeout(function () {
            $('#rotation').toggleClass("icon-rotate");
        }, 400);

    });

    $("#switchColors").click(function () {
        lockcheck();

        $('.switch-icon').toggleClass("icon-rotate");

        setTimeout(function () {
            $('.switch-icon').toggleClass("icon-rotate");
        }, 400);

        var save = color
        color = backgroundColor;
        backgroundColor = save;

        if (lock == true) {
            if (locktrigger == false) {
                lock = false;
            } else {
                lock = false;
                lock2 = true;
            }

            $('.one-lock').toggleClass("fa-lock fa-lock-open");
            $('.two-lock').toggleClass("fa-lock-open fa-lock");
        }

        if (lock2 == true) {
            if (locktrigger2 == false) {
                lock2 = false;
            } else {
                lock2 = false;
                lock = true;
            }

            $('.two-lock').toggleClass("fa-lock fa-lock-open");
            $('.one-lock').toggleClass("fa-lock-open fa-lock");
        }

        change(color, backgroundColor);
    })

    //copy to clipboard
    var clipboard = new ClipboardJS('.copyone');

    clipboard.on('success', function (e) {
        $('.message').text('Copied!')
        $('.messagebox').toggleClass('messagebox-open');

        setTimeout(function () {
            $('.messagebox').toggleClass('messagebox-open');
        }, 700);
    });

    var clipboard2 = new ClipboardJS('.copytwo');

    clipboard2.on('success', function (e) {
        $('.message').text('Copied!')
        $('.messagebox').toggleClass('messagebox-open');

        setTimeout(function () {
            $('.messagebox').toggleClass('messagebox-open');
        }, 700);
    });

    //lock function
    $(".lock").click(function () {
        $(this).toggleClass("fa-lock-open");
        $(this).toggleClass("fa-lock");
    });

    //easteregg
    var konamiCode = '38,38,40,40,37,39,37,39,66,65';
    var keyPresses = [];
    var checkKonami = function (e) {
        keyPresses.push(e.keyCode);
        if (keyPresses.slice(keyPresses.length - 10).join() === konamiCode) {
            runKonami();
        }
    };
    var runKonami = function () {
        $('.right-container').toggleClass('background-color color')
        $('.right-container').removeAttr("style");
        $('.color-palet-demo').toggleClass("shadow");
        giveRandomColor();
    };
    document.addEventListener('keyup', checkKonami);

    //overlay
    $(".overlay").click(function () {
        closeoverlay()
    });

    $("#close-img").ready(function () {
        $("#close-img").click(function () {
            closeoverlay()
        });
    });
    

    function closeoverlay() {
        if (overlay == true) {
            $('.overlay-container').css("display", "none");
            $('.overlay').toggleClass('overlay-open')
            overlay = false;

            if (screenshot == true) {
                cleanoverlay()
                screenshot = false;
            }

        } else {

        }
    }

    function openoverlay() {
        overlay = true;
        $('.overlay').toggleClass('overlay-open')
    }

    function cleanoverlay() {
        var elem = document.getElementById('remove');
        elem.parentNode.removeChild(elem);
        return false;
    }

    //screenshot
    $('#screenshot').click(function () {
        if (screenshot == false) {
            $('.color-palet-demo').toggleClass('color-palet-demo-hd')
            $('.color-infomation').css("display", "block");
            $('.overlay-container').css("display", "block");
            setTimeout(function () {
                html2canvas($('.color-palet-demo-hd'), {
                    onrendered: function (canvas) {
                        var img = canvas.toDataURL("image/png")
                        var html = '<div id="remove"><img src=' + img + '><a class="button" href=' + img + ' download>Download</a></div>';

                        $('.color-palet-demo').toggleClass('color-palet-demo-hd')
                        $('.color-infomation').css("display", "none");

                        openoverlay();

                        document.getElementById("overlay-content").innerHTML = html;
                        screenshot = true;
                    }
                });
            }, 50);
        } else {}
    });

    //css
    var clipboard2 = new ClipboardJS('#css', {
        text: function () {
            return "color: " + color + "; \r\n" + "background-color: " + backgroundColor + ";";
        }
    });
    
    clipboard2.on('success', function (e) {
        $('.message').text('CSS copied!')
        $('.messagebox').toggleClass('messagebox-open');

        setTimeout(function () {
            $('.messagebox').toggleClass('messagebox-open');
        }, 700);
    });

    //color history
    function addcolorHistory(color, backgroundColor) {
        if(colorHistory.length == 5) {
            colorHistory.pop();
            colorHistory.unshift([color, backgroundColor]);
        }else {
            colorHistory.unshift([color, backgroundColor]);
        }

        for(var i = 0; i <= 4; i++) {
            $(".col" + i).find('.cc').css('background-color', colorHistory[i][0])
            $(".col" + i).find('.bc').css('background-color', colorHistory[i][1])
        }
    }

    $('.hcolor').click(function () {
        for(var i = 0; i <= 4; i++) {
            if($(this).hasClass('col' + i) == true) {
                color = colorHistory[i][0];
                backgroundColor = colorHistory[i][1];
            }
            
        }


        change(color, backgroundColor);

    });

});
