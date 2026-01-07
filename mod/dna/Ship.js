let id = 0

class Ship {

    constructor(st) {
        augment(this, {
            name: 'ship' + (++id),
            dir:   math.rnda(),
            speed: 120,
            r:     40,
            x:     0,
            y:     0,

            bot:   true,
            controls: [],

            turnRate: .75 * PI,
            acceleration: 120,
            friction:     35,
            maxSpeed:     180,
            minSpeed:     -120,
        }, st)
    }

    capture() {
        if (env.playerShip) env.playerShip.release()

        this.bot = false
        env.playerShip = this
    }

    release() {
        this.bot = true
    }

    actuate(action) {
        this.controls[action] = true
    }

    cutOff(action) {
        this.controls[action] = false
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

    evoBot(dt) {
        const { x, y, r, dir, speed } = this

        
    }

    evoPlayer(dt) {
        const controls = this.controls

        if (controls[dry.LEFT]) {
            this.dir -= this.turnRate * dt
        }
        if (controls[dry.RIGHT]) {
            this.dir += this.turnRate * dt
        }

        if (controls[dry.UP]) {
            this.speed = clamp(this.speed + this.acceleration * dt, this.minSpeed, this.maxSpeed)
        } else if (controls[dry.DOWN]) {
            this.speed = clamp(this.speed - this.acceleration * dt, this.minSpeed, this.maxSpeed)
        }


        // friction
        if (this.speed > 0) {
            this.speed = max(this.speed - this.friction * dt, 0)
        } else if (this.speed < 0) {
            this.speed = min(this.speed + this.friction * dt, 0)
        }
    }

    evo(dt) {
        const { x, y, r, dir, speed } = this

        // move the ship
        this.x += cos(dir) * speed * dt
        this.y += sin(dir) * speed * dt

        // reflect the ship from the screen edges
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

        if (this.bot) this.evoBot(dt)
        else this.evoPlayer(dt)
    }

    draw() {
        const { x, y, r, dir } = this

        save()
        translate(x, y)
        rotate(dir + HALF_PI)

        translate(0, -.15*r)

        if (this.bot) fill('#deb935')
        else fill('#de763a')

        polygon(
             0,     -r,
            -.7*r,   r,
             0,     .4*r,
            .7*r,    r,
        )

        restore()

        save()
        translate(x, y)
        rotate(dir + HALF_PI)
        if (env.debugSteering) {
            lineWidth(1)
            stroke('#ff0000ff')
            line(0, 0, 0, -40)
            line(0, 0, 40, 0)
        }
        restore()

    }

}
