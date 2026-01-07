function draw() {

    if (env.playerShip) {
        const info = env.playerShip.dumpInfo()

        const ystep = 35

        let bx = 20,
            by = ctx.height - 40

        alignLeft()
        baseBottom()
        font('30px pixel-operator')
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
