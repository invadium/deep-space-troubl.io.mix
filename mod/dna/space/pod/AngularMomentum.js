class AngularMomentum {

    constructor(st) {
        augment(this, {
            name: 'angularMomentum',

            val: 0,
        }, st)
    }

    mag() {
        return abs(this.val)
    }

    reduce(amount) {
        if (this.val < 0) {
            this.val += amount
            if (this.val > 0) this.val = 0
        } else if (this.val > 0) {
            this.val -= amount
            if (this.val < 0) this.val = 0
        }
    }

    evo(dt) {
        this.__.rot += this.val * dt
    }

}
