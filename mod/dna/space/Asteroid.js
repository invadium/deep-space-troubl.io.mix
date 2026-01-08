let id = 0

const Body = require('dna/space/Body')

class Asteroid extends Body {

    constructor(st) {
        super( augment({
            name: 'asteroid' + (++id),

            points: [],
        }, st) )

        this.shape()

        // randomly give initial momentum (rotation and movement)
        this.angularMomentum.val = (2*rnd() - 1) * .2 * PI

        const randomDir = math.rnda()
        const randomSpeed = 40 * rnd()
        this.momentum.x = randomSpeed * cos(randomDir)
        this.momentum.y = randomSpeed * sin(randomDir)

    }

    shape() {
        let a = 0
        while(a < TAU) {
            const r = .5 * this.r + .5 * rnd() * this.r
            this.points.push({
                x: cos(a) * r,
                y: sin(a) * r,
            })
            a = a + .3 * PI * rnd()
        }
    }

    draw() {
        const { pos, rot, r, points } = this

        save()
        translate(pos.x, pos.y)
        rotate(rot)

        //stroke('#94908D')
        //circle(0, 0, r)

        // fill('#94908D')
        fill('#ad8863')
        points.forEach((p, i) => {
            if (i === 0) {
                moveTo(p.x, p.y)
            } else {
                lineTo(p.x, p.y)
            }
        })
        closePath()
        shape()

        const ls = this._ls
        for (let i = 0; i < ls.length; i++) {
            const pod = ls[i]
            if (!pod.hidden && pod.draw) {
                pod.draw()
            }
        }

        super.draw()

        restore()
    }

}
