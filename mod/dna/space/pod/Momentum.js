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

    add(dx, dy) {
        this.x += dx
        this.y += dy
    }

    sub(dx, dy) {
        this.x -= dx
        this.y -= dy
    }

    mul(dx, dy) {
        this.x *= dx
        this.y *= dy
    }

    div(dx, dy) {
        this.x /= dx
        this.y /= dy
    }

    dir() {
        return atan2(this.y, this.x)
    }

    mag() {
        return length(this.x, this.y)
    }

    dx() {
        if (this.x === 0) return 0
        const len = length(this.x, this.y)
        return this.x / len
    }

    dy() {
        if (this.y === 0) return 0
        const len = length(this.x, this.y)
        return this.y / len
    }

    evo(dt) {
        const pos = this.__.pos

        pos.x += this.x * dt
        pos.y += this.y * dt
    }

}
