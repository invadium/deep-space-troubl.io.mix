class Thruster {

    constructor(st) {
        augment(this, {
            name: 'thruster',

            accelerationForce: 240,
            decelerationForce: 240,
            maxSpeed:          400,

            turnForce:         10 * PI,
            maxTurnSpeed:      PI,
        }, st)
    }

    moveForward(dt) {
        const __ = this.__
        const momentum = __.momentum

        __.exhaust.burn(dry.DOWN, dt)
        if (momentum.mag() >= this.maxSpeed) return

        const amount = (this.accelerationForce/__.mass) * dt
        const dx = amount * cos(__.rot)
        const dy = amount * sin(__.rot)

        momentum.add(dx, dy)
    }

    moveBackward(dt) {
        const __ = this.__
        const momentum = __.momentum

        __.exhaust.burn(dry.UP, dt)
        if (momentum.mag() >= this.maxSpeed) return

        const amount = (this.decelerationForce/__.mass) * dt
        const dx = amount * cos(__.rot)
        const dy = amount * sin(__.rot)

        momentum.sub(dx, dy)
    }

    turnLeft(dt) {
        const __ = this.__
        const angularMomentum = __.angularMomentum

        __.exhaust.burn(dry.RIGHT, dt)
        if (angularMomentum.mag() >= this.maxTurnSpeed) return

        angularMomentum.val -= (this.turnForce/__.mass) * dt
    }

    turnRight(dt) {
        const __ = this.__
        const angularMomentum = __.angularMomentum

        __.exhaust.burn(dry.LEFT, dt)
        if (angularMomentum.mag() >= this.maxTurnSpeed) return

        angularMomentum.val += (this.turnForce/__.mass) * dt
    }
}
