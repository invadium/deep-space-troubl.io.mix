module.exports = function(e) {
    if (e && e.repeat) return

    if (lab.hud.console.hidden) {
        // need to defer to avoid reading tilda in the console
        defer(() => lib.control.show())
    } else {
        lib.control.hide()
    }
}
