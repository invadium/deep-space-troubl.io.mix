let id = 0

const Platform = require('dna/space/Platform')

class Ship extends Platform {

    constructor(st) {
        super( augment({
            name: 'ship' + (++id),
            r:     40,

            bot:   true,
        }, st) )

        this.attach( new dna.pod.Thruster() )
        this.attach( new dna.pod.PlayerControl() )
        this.attach( new dna.pod.Friction({
            linear:  120,
            angular: 4 * HALF_PI,
        }) )
    }

    capture() {
        if (env.playerShip) env.playerShip.release()

        this.bot = false
        env.playerShip = this
        this.playerControl.activate()

        lab.port.follow(this.pos, true)
    }

    release() {
        this.bot = true
        this.playerControl.deactivate()
    }

    draw() {
        const { pos, rot, r } = this

        save()
        translate(pos.x, pos.y)
        rotate(rot + HALF_PI)

        // translate(0, -.15*r)

        if (this.bot) fill('#deb935')
        else fill('#de763a')

        polygon(
             0,     -r,
            -.7*r,   r,
             0,     .4*r,
            .7*r,    r,
        )

        super.draw()

        restore()

        // TODO move out to a debug pod
        save()
        translate(pos.x, pos.y)
        rotate(dir + HALF_PI)
        if (env.debugSteering) {
            lineWidth(1)
            stroke('#ff0000ff')
            line(0, 0, 0, -40)
            line(0, 0, 40, 0)
        }
        restore()
    }

    dumpInfo() {
        return {
            name: this.name,
            x: round(this.pos.x * 10)/10,
            y: round(this.pos.y * 10)/10,

            linear: `${round(this.momentum.x*10)/10}:${round(this.momentum.y*10)/10}`,
            angular: `${round(this.angularMomentum.val*10)/10}`
        }
    }

}
