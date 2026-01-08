// show console
function show() {
    $.lab.pause()
    __$.disableOthers()
    lab.hud.captureFocus(lab.hud.console)
    lab.hud.console.hidden = false
    lab.hud.console.disabled = false
    lab.hud.adjust()
}

// hide console
function hide() {
    $.lab.resume()
    __$.enableOthers()
    lab.hud.releaseFocus(lab.hud.console)
    lab.hud.console.hidden = true
    lab.hud.console.disabled = true
}
