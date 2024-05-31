let button = document.getElementById("dont");

function setScale2(xscale,xanchor,yscale,yanchor) {
    button.style.top = `${yscale}%`;
    button.style.left = `${xscale}%`;
    button.style.translate = `${-xanchor}% ${-yanchor}%`
}

let stage = 0;

let speed = 6;
let enabled = true;

let x = 0;
let y = 0;

let xdir = 1;
let ydir = 1;


function random() {
    x = Math.round(Math.random() * window.innerWidth);
    y = Math.round(Math.random() * window.innerHeight);
}

let options = [
    ["Voit yrittää, mutta et voi",50,50,50,50],
    ["Haluatko takaisin kotisivulle",50,0,50,0],
    ["Et pääse",30,100,30,100],
    ["Saahan sitä haluta",0,0,0,0],
    ["Älä edes yritä",100,100,100,100],
    ["Miksi yrität",100,100,0,0],
    ["Kun et muutenkaan pääse",0,0,100,100],
    {call:function() {
        button.innerHTML = "Takasin kotisivulle";

        setScale2(0,50,0,50);

        let c = function() {
            let w = window.innerWidth;
            let h = window.innerHeight;

            x += xdir * speed;
            y += ydir * speed;

            if (x > w) {
                x = w - (x - w);
                xdir = -1;
            } else if (x < 0) {
                x = -x;
                xdir = 1;
            }
            if (y > h) {
                y = h - (y - h);
                ydir = -1;
            } else if (y < 0) {
                y = -y;
                ydir = 1;
            }

            button.style.top = y+"px";
            button.style.left = x+"px";

            if (enabled) {
                window.requestAnimationFrame(c);
            }
        }

        window.requestAnimationFrame(c);
    }},
    {call:function() {
        button.innerHTML = "Oletko varma asiasta";
        random();
        speed = 8;
    }},
    {call:function() {
        button.innerHTML = "Oletko absoluuttisesti varma että \nhaluat mennä takaisin kotisivulle?";
        random();
        speed = 12;
    }},
    {call:function() {
        button.innerHTML = "Menemällä kotisivulle, \nhyväksyt käyttöehdot";
        random();
        speed = 24;
    }},
    {call:function() {
        button.innerHTML = "Jos painat tätä, \nniin hyväksyt käyttöehdot";
        random();
        speed = 32;
    }},
    {call:function() {
        enabled = false;
        window.requestAnimationFrame(function() {
            setScale2(50,50,50,50);
        })
    }},
]

let options1 = [
    {call:function() {
        window.open();
    }}
]

button.onmousedown = function() {
    const option = options[stage];

    stage++;

    if (option.call) {
        option.call();
    } else {
        button.innerHTML = option[0];
        setScale2(option[1],option[2],option[3],option[4])
    }
}


document.getElementById("start").onclick = function() {
    document.body.requestFullscreen();
    let fade = document.getElementById("fade");
    let overlay = document.getElementById("overlay");
    fade.style.display = "none";
    overlay.style.display = "none";
    button.style.position = "absolute";
    button.style.zIndex = 9;
}