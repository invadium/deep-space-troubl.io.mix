class Thruster {

    constructor(st) {
        augment(this, {
            name: 'thruster',

            turnRate: .75 * PI,
            acceleration: 120,
            friction:     35,
            maxSpeed:     180,
            minSpeed:     -120,
        }, st)
    }

    evo(dt) {
    }

}
