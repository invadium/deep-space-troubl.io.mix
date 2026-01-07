class Momentum {

    constructor(st) {
        augment(this, {
            name: 'momentum',

            x: 0,
            y: 0,

        }, st)
    }

    init() {
        if (!isObj(this.__.pos)) throw `Can't attach the momentum pod - a position object is expected!`
    }

    evo(dt) {
        const pos = this.__.pos

        pos.x += this.x * dt
        pos.y += this.y * dt
    }

}
