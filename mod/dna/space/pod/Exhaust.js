class Exhaust {

    constructor(st) {
        augment(this, {
            name: 'exhaust',
            gas:   [0, 0, 0, 0, 0],
            puffs: [],

            opt: [
                // NONE
                {},
                // UP
                {
                    fq:     1/100,
                    dx:     35,
                    dy:     0,
                    bsize:  2,
                    vsize:  1,
                    spread: 10,
                },
                // LEFT
                {
                    fq:     1/40,
                    dx:     38,
                    dy:    -5,
                    bsize:  1,
                    vsize:  1,
                    spread: 10,
                },
                // DOWN
                {
                    fq:     1/100,
                    dx:     -30,
                    dy:      0,
                    bsize:   3,
                    vsize:   2,
                    spread:  20,
                },
                // RIGHT
                {
                    fq:      1/40,
                    dx:      38,
                    dy:      5,
                    bsize:   1,
                    vsize:   1,
                    spread:  10,
                },
            ],
        }, st)
    }

    release(dir) {
        const __ = this.__
        const pos = __.pos

        const lshift = this.opt[dir]
        const shift = __.upos([lshift.dx, lshift.dy])


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
            x:        pos.x + shift[0] + lshift.spread * rnd(),
            y:        pos.y + shift[1] + lshift.spread * rnd(),
            dir:      lib.math.rnda(),
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

                    const x = p.x,
                          y = p.y,
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
