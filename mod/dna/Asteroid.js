let id = 0

class Asteroid {

     constructor(st) {
        augment(this, {
            name: 'asteroid' + (++id),
            dir:   math.rnda(),
            rot:   0,
            speed: 40,
            r:     100,
            x:     0,
            y:     0,

            bot:   true,
            controls: [],

            turnRate: -.1 * PI,
            acceleration: 120,
            friction:     0,
            maxSpeed:     180,
            minSpeed:     -120,
            points: [],
        }, st)

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

    reflectX() {
        const dx = -cos(this.dir),
              dy = sin(this.dir)
        this.dir = atan2(dy, dx)
    }

    reflectY() {
        const dx = cos(this.dir),
              dy = -sin(this.dir)
        this.dir = atan2(dy, dx)
    }

    evo(dt) {
        const { x, y, r, dir, speed } = this

        // move the asteroid
        this.x += cos(dir) * speed * dt
        this.y += sin(dir) * speed * dt
        this.rot += this.turnRate * dt

        // reflect the asteroid from the screen edges
        if (x < r) {
            this.reflectX()
            this.x = r
        } else if (x > ctx.width - r) {
            this.reflectX()
            this.x = ctx.width - r
        }

        if (y < r) {
            this.reflectY()
            this.y = r
        } else if (y > ctx.height - r) {
            this.reflectY()
            this.y = ctx.height - r
        }
    }

    draw() {
        const { x, y, r, dir, rot, points } = this

        save()
        translate(x, y)
        rotate(rot)

        //stroke('#94908D')
        //circle(0, 0, r)

        fill('#94908D')
        points.forEach((p, i) => {
            if (i === 0) {
                moveTo(p.x, p.y)
            } else {
                lineTo(p.x, p.y)
            }
        })
        closePath()
        shape()

        restore()
    }

}
