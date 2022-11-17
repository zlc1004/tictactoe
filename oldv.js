(function (document) {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_$';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    function tojson(obj) {
        return JSON.stringify(obj)
    }
    var DOCBODY = document.getElementsByTagName("body")[0]
    var isyourturn = true
    var gameend = false;
    const dgid = function (id_) {
        return document.getElementById(id_)
    }
    const p = function printhaha(xa) {
        console.log(xa)
    }
    function addtodoc(place, type) {
        return place.appendChild(document.createElement(type))
    }
    const socket = new WebSocket('ws://10.15.32.133:9800');
    const winlehaha = function (thewiningxorohahahomgshduhcnsdhjgnfbvndfhjnvmhbdsfghjvnbendfhgvbdnf) {
        // dgid("maingamediv").hidden = true
        dgid("win" + thewiningxorohahahomgshduhcnsdhjgnfbvndfhjnvmhbdsfghjvnbendfhgvbdnf).hidden = false;
        dgid("win" + thewiningxorohahahomgshduhcnsdhjgnfbvndfhjnvmhbdsfghjvnbendfhgvbdnf).classList.add("win")
        gameend = true;

        dgid("restart").hidden = false
        dgid("restart").style.position = "absolute"
    }
    const winpossibly = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
    const checkwin = function () {
        let didwin = false
        winpossibly.forEach(function (win) {
            p(win)
            let gogogogo = "";
            win.forEach(function (winqqq_) {
                p(winqqq_)
                if (xoboxs[winqqq_ - 1].classList.in) {
                    return
                };
                gogogogo += xoboxs[winqqq_ - 1].classList[0]
            });
            if (gogogogo == "xxx" || gogogogo == "ooo") {
                win.forEach(function (winabc) {
                    xoboxs[winabc - 1].parentElement.classList.add("win")
                })
                winlehaha(gogogogo[0])
                didwin = true
                return
            }
            gogogogo = ""
        })
        if (!didwin) {
            let ishaha = ""
            xoboxs.forEach(function (boxss) {
                // if 
                ishaha += boxss.classList.length + ""
            })
            p(ishaha)
            if (!ishaha.includes("0")) {
                tieed()
                return
            }
        }
    }

    function tieed() {
        xoboxs.forEach(function (boxsss) {
            boxsss.parentElement.classList.add("win")
        })
        dgid("tie").hidden = false
        dgid("restart").hidden = false
        dgid("restart").style.position = "absolute"
        gameend = true;
    }
    dgid("restart").addEventListener("click", function () {
        location.reload()
    })

    omgaaaaaa = function (msg) {
        let mamamiya = JSON.parse(msg.data)
        if (mamamiya["type"] == "ok") {
            dgid("lang").innerHTML = ""
            mamamiya["data"].forEach(function (a) {
                dgid("lang").innerHTML += `<option value="` + a + `">` + a + `</option>`
            })
        }
        else if (mamamiya["type"] === "admin-server-messages.id==from.server==true") {
            document.innerHTML = `<h1>message from server<br>` + mamamiya["data"] + `</h1>`
            gameend = true;
        }
        else if (mamamiya["type"] == "ask-do-you-want") {
            let tmpdiv = addtodoc(DOCBODY, "div")
            addtodoc(tmpdiv, "p").innerHTML = mamamiya["data"] + "want to play with you."
            let yesbtn = addtodoc(tmpdiv, "button")
            yesbtn.id = "tempbutton-" + makeid(5)
            yesbtn.innerHTML = "YES"
            let nobtn = addtodoc(tmpdiv, "button")
            nobtn.id = "tempbutton-" + makeid(5)
            nobtn.innerHTML = "NO"
            yesbtn.addEventListener("click", function (e) {
                socket.send(tojson({ "type": "ask-do-i-want", data: ["yes", mamamiya["data"]] }))
                otherguyid = mamamiya["data"]
                dgid("inputotherid").hidden = true
                dgid("maingamediv").hidden = false
            })
            nobtn.addEventListener("click", function (e) {
                document.innerHTML = "you say no"
                gameend = true;
            })
        }
        else if (mamamiya["type"] == "ask-do-you-want-res") {
            if (mamamiya["data"]["yesno"]=="yes"){
                otherguyid = mamamiya["data"]["playerid"]
                dgid("inputotherid").hidden = true
                dgid("maingamediv").hidden = false
            }
            else if (mamamiya["data"]["yesno"]=="no"){
                document.innerHTML = "'"+mamamiya["data"]["playerid"]+"' say no"
                gameend = true;
            }
        }
        else {
            setxoro(xoboxs[mamamiya["data"][1] - 1]);
            isyourturn = true
        }

    }

    socket.addEventListener("message", omgaaaaaa)
    const xoboxs = [dgid("xo1"), dgid("xo2"), dgid("xo3"), dgid("xo4"), dgid("xo5"), dgid("xo6"), dgid("xo7"), dgid("xo8"), dgid("xo9")]

    const setxoro = function (xasd) {
        if (xasd.classList.length == 0 && !gameend) {
            isyourturn = false
            xasd.setxo(xoro);
            if (xoro == "x") {
                xoro = "o"
            }
            else {
                xoro = "x"
            };
            checkwin()
        }
    }
    var xoro = "x"
    dgid("useridhahahabtn").addEventListener("click", function (e) {
        let idhahaaaaaaaaa = dgid("useridhaha").value
        socket.send(`{"type":"setid","data":"` + idhahaaaaaaaaa + `"}`)
        socket.send(`{"type":"getplayer"}`)
        dgid("inputusername").hidden = true
        dgid("inputotherid").hidden = false
    })
    var otherguyid = ""
    dgid("hehe").addEventListener("click", function (e) {
        otherguyid = dgid("lang").value
        dgid("inputotherid").hidden = true
        dgid("maingamediv").hidden = false
    })
    dgid("reloddddedededededded").addEventListener("click", function (e) {
        socket.send(`{"type":"getplayer"}`)
    })
    function sendtosocket(obj) {
        socket.send(`{"type":"setplay","data":{"player":"` + otherguyid + `","xo":"x","number":"` + (xoboxs.indexOf(obj) + 1).toString() + `"}}`)
    }

    p("Starting")
    xoboxs.forEach(function (x) {
        p(x)
        x.setxo = function (xw) {
            this.classList.add(xw)
        }
        x.parentElement.addEventListener("click", function () {
            if (isyourturn) {
                setxoro(x);
                sendtosocket(x)
                p(x)
            }
        })
    })



})(document);