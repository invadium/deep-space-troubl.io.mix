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
        const _   = this,
              __  = _.__,
              pos = __.pos,
              px  = pos.x,
              py  = pos.y

        // make the move
        pos.x += _.x * dt
        pos.y += _.y * dt

        let contact = false
        __.solid.inContact = false
        // resolve collisions
        lab.overlord.collider.contact(__.solid, (target, targetSolid, contactData) => {
            // log(`${__.name} => ${target.name}`)
            // console.dir(contactData)
            contact = true
            __.solid.inContact = true
            targetSolid.inContact = true

            target.momentum.x *= -1
            target.momentum.y *= -1
        })

        if (contact) {
            pos.x = px
            pos.y = py
            _.x = -_.x
            _.y = -_.y
        }

        /*
        // DEBUG
        // detect more collisions
        // TODO maybe do it in a while to detect the stuck objects and release them?
        if (__ instanceof dna.space.Ship) {
            lab.overlord.collider.contact(__.solid, (target, targetSolid, contactData) => {
                console.log(`${px}:${py} -> ${nx}:${ny} => ${pos.x}:${pos.y} (contact: ${contact})`)
            })
        }
        */
    }

}
