class Friction {

    constructor(st) {
        augment(this, {
            name:    'friction',
            linear:   1,
            angular:  1,
        }, st)
    }

    evo(dt) {
        const __ = this.__
        const momentum = __.momentum

        // linear friction
        const lmag = momentum.mag()
        if (lmag > 0) {
            const amount = (this.linear/__.mass) * dt
            let nmag = lmag - amount
            if (nmag < 0) nmag = 0

            momentum.x = nmag * (momentum.x / lmag)
            momentum.y = nmag * (momentum.y / lmag)
        }

        // angular friction
        const angularMomentum = __.angularMomentum
        const amag = angularMomentum.mag()
        if (amag > 0) {
            angularMomentum.reduce(this.angular * dt)
        }
    }

}
