function draw() {

    if (env.playerShip) {
        const info = env.playerShip.dumpInfo()

        const f = env.style.font.main.head
        const ystep = 35

        let bx = 20,
            by = ctx.height - 60

        alignLeft()
        baseBottom()
        font(f)
        fill(.15, .6, .6)

        const keys = Object.keys(info)

        for (let i = keys.length - 1; i >= 0; i--) {
            const key = keys[i],
                  val = info[key]
            text(`${key}: ${val}`, bx, by)
            by -= ystep
        }
    }

}
