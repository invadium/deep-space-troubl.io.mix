class PlayerControl {

    constructor(st) {
        augment(this, {
            name: 'playerControl',

            turnRate: PI,

            controls: [],
        }, st)
    }

    init() {
        this.deactivate()
    }

    activate() {
        this.paused   = false
        this.disabled = false
    }

    deactivate() {
        this.paused   = true
        this.disabled = true
    }

    actuate(action) {
        this.controls[action] = true
    }

    cutOff(action) {
        this.controls[action] = false
    }

    evo(dt) {
        const controls = this.controls

        if (controls[dry.LEFT]) {
            this.__.rot -= this.turnRate * dt
        }
        if (controls[dry.RIGHT]) {
            this.__.rot += this.turnRate * dt
        }

        if (controls[dry.UP]) {
            this.speed = clamp(this.speed + this.acceleration * dt, this.minSpeed, this.maxSpeed)
        } else if (controls[dry.DOWN]) {
            this.speed = clamp(this.speed - this.acceleration * dt, this.minSpeed, this.maxSpeed)
        }
    }
}
