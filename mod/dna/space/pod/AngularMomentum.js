class AngularMomentum {

    constructor(st) {
        augment(this, {
            name: 'angularMomentum',

            val: 0,
        }, st)
    }

    evo(dt) {
        this.__.rot += this.val * dt
    }
}
