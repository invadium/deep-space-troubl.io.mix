'use strict'

function getLocal(name) {
    if (!isFrame(__$.cmd)) return

    const fn = __$.cmd._dir[name]
    if (!isFun(fn)) return
    return fn
}

function getGlobal(name) {
    if (!isFrame($.cmd)) return

    const fn = $.cmd._dir[name]
    if (!isFun(fn)) return
    return fn
}

function setup() {

    const hud = lab.spawn('hud/Hud', {
        'name': 'hud'
    })

    const con = hud.spawn('hud/gadget/Console', {
        hidden: true,
        name: 'console',
        x: 0,
        y: 0,
        cur: $,

        adjust: function() {
            this.w = ctx.width
            this.h = ctx.height
        },

        hide: function() {
            lib.control.hide()
        },

        show: function() {
            lib.control.show()
        },
    })

    function print(msg) {
        if (__$.env.logToConsole) con.print(msg)
    }

    // define command processing
    con.onCommand = function(cmd) {
        if (!cmd) return
        const words = cmd.trim().split(' ').filter(w => w.length > 0)
        if (words.length === 0) return
        const command = words[0]
        env.sfxFeedback = true

        // find a function
        let fn = getGlobal(command)
        if (!fn) fn = getLocal(command)

        if (fn) {
            try {
                const res = fn(words, cmd, con)
                if (res) con.print(res)
                if (env.sfxFeedback) $.lib.sfx('console-command')
            } catch (e) {
                con.print(e)
                console.error(e)
                // $.lib.sfx('console-error')
            }

        } else {
            // check default handler
            fn = getGlobal('_default')
            if (!fn) fn = getLocal('_default')

            if (fn) {
                try {
                    const res = fn(words, cmd, con)
                    if (res) con.print(res)
                    if (env.sfxFeedback) $.lib.sfx('console-command')
                } catch (e) {
                    con.print(e)
                    console.error(e)
                    // $.lib.sfx('console-error')
                }
            } else {
                con.print('unknown command: [' + command + ']')
                // $.lib.sfx('console-error')
            }
        }
    }

    lib.control.hide()
}
