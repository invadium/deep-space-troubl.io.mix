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
        this.controls[action.id] = true
    }

    cutOff(action) {
        this.controls[action.id] = false
    }

    evo(dt) {
        const __ = this.__
        const controls = this.controls

        if (controls[dry.LEFT]) {
            __.thruster.turnLeft(dt)
            //__.rot -= this.turnRate * dt
        }
        if (controls[dry.RIGHT]) {
            __.thruster.turnRight(dt)
            //__.rot += this.turnRate * dt
        }

        if (controls[dry.UP]) {
            __.thruster.moveForward(dt)
            //this.speed = clamp(this.speed + this.acceleration * dt, this.minSpeed, this.maxSpeed)
        } else if (controls[dry.DOWN]) {
            __.thruster.moveBackward(dt)
            //this.speed = clamp(this.speed - this.acceleration * dt, this.minSpeed, this.maxSpeed)
        }
    }
}
