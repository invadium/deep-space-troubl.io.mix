class Exhaust {

    constructor(st) {
        augment(this, {
            name: 'exhaust',
            gas:   [0, 0, 0, 0, 0],
            puffs: [],

            opt: [
                // NONE
                {},
                // UP - retro-rockets
                {
                    fq:     1/100,
                    dx:     52,
                    dy:     0,
                    bsize:  2,
                    vsize:  2,
                    spread: 5,
                    thrustVector: 0,
                    thrustSpread: .0375 * PI,
                    thrustSpeed:  20,
                },
                // LEFT - attitude
                {
                    fq:     1/80,
                    dx:     38,
                    dy:    -10,
                    bsize:  1,
                    vsize:  1,
                    spread: 10,
                    thrustVector: 0,
                    thrustSpread: .125 * PI,
                    thrustSpeed:  10,
                },
                // DOWN - the main engine
                {
                    fq:     1/150,
                    dx:     -28,
                    dy:      0,
                    bsize:   2,
                    vsize:   3,
                    spread:  5,
                    thrustVector: PI,
                    thrustSpread: .075 * PI,
                    thrustSpeed:  20,
                },
                // RIGHT - attitude
                {
                    fq:      1/80,
                    dx:      38,
                    dy:      10,
                    bsize:   1,
                    vsize:   1,
                    spread:  10,
                    thrustVector: 0,
                    thrustSpread: .125 * PI,
                    thrustSpeed:  10,
                },
            ],
        }, st)
    }

    release(dir) {
        const __ = this.__
        const pos = __.pos

        const lshift = this.opt[dir]
        const gshift = __.northOrientedPos([lshift.dx, lshift.dy])

        const thrustVector = (__.rot + lshift.thrustVector) + lshift.thrustSpread * (2*rnd() - 1),
              dx = cos(thrustVector) * lshift.thrustSpeed,
              dy = sin(thrustVector) * lshift.thrustSpeed

        let p
        if (this.lastDead) {
            p = this.lastDead
            this.lastDead = null
        } else {
            p = {}
            this.puffs.push(p)
        }

        extend(p, {
            alive:    true,
            born:     env.time,
            x:        pos.x + gshift[0] + lshift.spread * (2*rnd() - 1),
            y:        pos.y + gshift[1] + lshift.spread * (2*rnd() - 1),
            dx:       dx,
            dy:       dy,
            // dir:      lib.math.rnda(),
            size:     lshift.bsize + lshift.vsize * rnd(),
            lifespan: 1 + 1 * rnd(),
        })

        this.gas[dir] = 0
    }

    burn(dir, dt) {
        this.gas[dir] += dt

        while (this.gas[dir] > this.opt[dir].fq) {
            this.release(dir)
            this.gas[dir] -= this.opt[dir].fq
        }
    }

    preDraw() {
        const ls = this.puffs

        save()
        fill('#908894')
        for (let i = ls.length - 1; i >= 0; i--) {
            const p = ls[i]
            if (p.alive) {
                const age = env.time - p.born
                if (age > p.lifespan) {
                    p.alive = false
                } else {
                    const ageFactor = age/p.lifespan
                    alpha(1 - ageFactor)

                    const x = p.x + p.dx * age,
                          y = p.y + p.dy * age,
                          s = p.size * (1 + 4 * ageFactor)
                    rect(x-s, y-s, 2*s, 2*s)
                }
            } else {
                this.lastDead = p
            }
        }
        restore()
    }

}
