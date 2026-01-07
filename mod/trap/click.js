function click(e) {
    const ls = []
    lab.port.pick(e.x, e.y, ls)

    if (ls.length === 0) {
        const cx = round(lab.port.lx(e.x)),
              cy = round(lab.port.ly(e.y))
        log(`at ${e.x}:${e.y} -> ${cx}:${cy}`)

    } else {
        if (ls.length === 1) {
            console.dir(ls[0])
        } else {
            console.dir(ls)
        }

        const capturable = ls.filter(e => e.capture)
        if (capturable.length > 0) {
            capturable[0].capture()
        }
    }
}
