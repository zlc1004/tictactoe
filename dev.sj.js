(function (r, t) {
    "use strict";
    r.onerror = function (e, r, t) {
        return false
    };
    r.AudioContext = r.AudioContext || r.webkitAudioContext;
    var s = function (e) {
        try {
            var r = "_";
            e.setItem(r, r);
            e.removeItem(r);
            return true
        }
        catch (e) {
            return false
        }
    }(r.localStorage);
    var e = t.getElementById("consent");
    var o = !!e;

    function a() {
        (r.adsbygoogle || []).pauseAdRequests = 0;
        if (o) {
            t.body.classList.add("cookies-consent")
        }
    }

    function n() {
        if (!o || s && localStorage.getItem("consent")) {
            a()
        }
        else {
            e.addEventListener("click", function () {
                a();
                if (s) {
                    localStorage.setItem("consent", true)
                }
            })
        }
    }

    function i(r) {
        var e = new XMLHttpRequest;
        e.open("GET", "/assets/audio/" + r + ".mp3", true);
        e.responseType = "arraybuffer";
        e.onload = function () {
            p.decodeAudioData(e.response, function (e) {
                d[r] = e
            }, function () { })
        };
        e.send()
    }

    function y(e) {
        if (L || !d[e]) {
            return
        }
        if (p && p.resume) {
            p.resume()
        }
        var r = p.createBufferSource();
        r.buffer = d[e];
        r.connect(p.destination);
        if (r.start) {
            r.start(0)
        }
        else {
            r.noteOn(0)
        }
    }
    var u = {},
        c = {
            player1: 0,
            player2: 0,
            ties: 0
        },
        l = {
            player1: 0,
            player2: 0,
            ties: 0
        },
        f = "x",
        m = "o",
        d = {},
        p, v = 9,
        L, q, h = true,
        g = true,
        S = false,
        w = 300,
        b = .75,
        T, M = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

    function k() {
        for (var e = u.mute.length; e--;) {
            u.mute[e].style.display = L ? "none" : ""
        }
    }

    function A() {
        L = !L;
        if (s) {
            localStorage.setItem("muted", L.toString())
        }
        k()
    }

    function D() {
        S = !S;
        var e = u.scores.scores.classList;
        if (S) {
            e.remove("p1");
            e.add("p2");
            g = true
        }
        else {
            e.remove("p2");
            e.add("p1");
            g = false
        }
        u.scores.player1.innerHTML = S ? l.player1 : c.player1;
        u.scores.player2.innerHTML = S ? l.player2 : c.player2;
        u.scores.ties.innerHTML = S ? l.ties : c.ties;
        q = false;
        O()
    }

    function H(e, r) {
        u.squares[r].querySelector("div").classList.add(e)
    }

    function I() {
        var e = u.scores.turn1.classList,
            r = u.scores.turn2.classList,
            t = u.scores.turnTies.classList;
        if (S && u.restart.style.display === "none") {
            if (h) {
                r.remove("turn");
                e.add("turn")
            }
            else {
                e.remove("turn");
                r.add("turn")
            }
            t.add("turn")
        }
        else {
            e.remove("turn");
            r.remove("turn");
            t.remove("turn")
        }
    }

    function x(e) {
        if (T[e] !== 0 || B() || !S && h) {
            return
        }
        if (S) {
            h = !h;
            T[e] = h ? -1 : 1;
            H(h ? f : m, e);
            y("note-" + (h ? "low" : "high"));
            B()
        }
        else {
            T[e] = -1;
            H(f, e);
            h = true;
            y("note-low");
            setTimeout(E, w)
        }
        I()
    }

    function C(s, o) {
        u.restart.style.display = "block";
        setTimeout(function () {
            var e = "Game",
                r = S ? "players " : "computer ";
            setTimeout(function () {
                q = false
            }, w);
            if (o) {
                for (var t = 3; t--;) {
                    u.squares[o[t]].classList.add("win")
                }
            }
            switch (s) {
                case f:
                    u.scores.player1.innerHTML = S ? ++l.player1 : ++c.player1;
                    u.scores.player1.classList.add("appear");
                    u.board.classList.add("win");
                    y("game-over");
                    break;
                case m:
                    u.scores.player2.innerHTML = S ? ++l.player2 : ++c.player2;
                    u.scores.player2.classList.add("appear");
                    u.board.classList.add("win");
                    y("game-over");
                    break;
                default:
                    u.scores.ties.innerHTML = S ? ++l.ties : ++c.ties;
                    u.scores.ties.classList.add("appear");
                    u.board.classList.add("tie");
                    y("game-over-tie");
                    break
            }
        }, h && !S ? 100 : w + 100)
    }

    function B() {
        for (var e = M.length; e--;) {
            var r = M[e],
                t = T[r[0]] + T[r[1]] + T[r[2]];
            if (t === 3 || t === -3) {
                C(t === 3 ? m : f, r);
                return true
            }
        }
        var s = 0;
        for (e = v; e--;) {
            if (T[e] !== 0) {
                s++
            }
        }
        if (s === 9) {
            C();
            return true
        }
        return false
    }

    function E() {
        if (B()) {
            return
        }
        var e, r, t, s, o, a, n = 0;
        h = false;
        I();
        y("note-high");
        for (e = v; e--;) {
            if (T[e] !== 0) {
                n++;
                if (n === 1) {
                    a = e
                }
            }
        }
        if (n < 2 && Math.random() > .2) {
            do {
                o = Math.floor(Math.random() * v)
            } while (o === a)
        }
        else {
            for (e = v; e--;) {
                for (r = v; r--;) {
                    if (T[r] !== 0) {
                        continue
                    }
                    T[r] = 1;
                    if (B()) {
                        H(m, r);
                        return
                    }
                    T[r] = 0
                }
                if (T[e] !== 0) {
                    continue
                }
                T[e] = 1;
                var i = null,
                    u = T.concat();
                for (r = v; r--;) {
                    if (u[r] !== 0) {
                        continue
                    }
                    u[r] = -1;
                    for (t = M.length; t--;) {
                        if (u[M[t][0]] + u[M[t][1]] + u[M[t][2]] === -3 && Math.random() > b) {
                            T[e] = 0;
                            T[r] = 1;
                            H(m, r);
                            B();
                            return
                        }
                    }
                    var c = 0,
                        l = 0,
                        f = u.concat(),
                        d = u.concat();
                    for (t = v; t--;) {
                        if (f[t] === 0) {
                            f[t] = 1
                        }
                        if (d[t] === 0) {
                            d[t] = -1
                        }
                    }
                    for (t = M.length; t--;) {
                        if (f[M[t][0]] + f[M[t][1]] + f[M[t][2]] === 3) {
                            c++
                        }
                        if (d[M[t][0]] + d[M[t][1]] + d[M[t][2]] === -3) {
                            l++
                        }
                    }
                    var p = c - l;
                    i = i == null ? p : i > p ? p : i;
                    u[r] = 0
                }
                if (s == null || s < i) {
                    s = i;
                    o = e
                }
                T[e] = 0
            }
        }
        T[o] = 1;
        H(m, o);
        B()
    }

    function G(r) {
        u.squares[r].ontouchstart = u.squares[r].onmousedown = function (e) {
            e.preventDefault();
            x(r)
        }
    }

    function O() {
        if (q) {
            return
        }
        q = true;
        u.restart.style.display = "none";
        T = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var e = v; e--;) {
            u.squares[e].classList.remove("win");
            u.squares[e].querySelector("div").className = ""
        }
        u.scores.ties.classList.remove("appear");
        u.scores.player1.classList.remove("appear");
        u.scores.player2.classList.remove("appear");
        u.board.classList.remove("win");
        u.board.classList.remove("tie");
        h = g = !g;
        I();
        if (g && !S) {
            setTimeout(E, w)
        }
    }
    t.addEventListener("DOMContentLoaded", function () {
        u = {
            board: t.querySelector(".board"),
            squares: t.querySelectorAll(".square"),
            restart: t.querySelector(".restart"),
            muteButton: t.querySelector(".mute"),
            mute: t.querySelectorAll(".mute path"),
            privacy: t.querySelector(".privacy"),
            scores:
            {
                scores: t.querySelector(".scores"),
                swap: t.querySelector(".swap"),
                player1: t.querySelector(".player1 .score"),
                player2: t.querySelector(".player2 .score"),
                ties: t.querySelector(".ties .score"),
                turn1: t.querySelector(".player1"),
                turn2: t.querySelector(".player2"),
                turnTies: t.querySelector(".ties")
            }
        };
        for (var e = v; e--;) {
            G(e)
        }
        u.restart.ontouchstart = u.scores.scores.ontouchstart = function (e) {
            e.preventDefault()
        };
        u.scores.scores.ontouchend = u.scores.scores.onclick = function (e) {
            e.preventDefault();
            D()
        };
        u.restart.ontouchend = u.restart.onclick = function (e) {
            e.preventDefault();
            O()
        };
        if (r.AudioContext) {
            p = new AudioContext;
            i("note-high");
            i("note-low");
            i("game-over");
            i("game-over-tie");
            L = s ? localStorage.getItem("muted") === "true" : false;
            k();
            u.muteButton.ontouchstart = u.muteButton.onclick = function (e) {
                e.preventDefault();
                A()
            }
        }
        n();
        O()
    })
})(window, document);