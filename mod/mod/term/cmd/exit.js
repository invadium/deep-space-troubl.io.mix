'use strict'

function exit(args, line, con) {
    lib.control.hide()
    env.sfxFeedback = false
    $.lib.sfx('console-close')
}

exit.info = 'close the console'
