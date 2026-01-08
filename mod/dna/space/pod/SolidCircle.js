class SolidCircle {

    constructor(st) {
        extend(this, {
            name:    'solid',

            x:        0,
            y:        0,
            r:        1,
            r2:       1,
        }, st)
    }

    init() {
        this.r2 = this.r * this.r
    }

    lxy(wx, wy) {
        const vec2 = this.__.lpos([wx, wy])
        // translate from body/parent coordinates to the local ones
        vec2[0] -= this.x
        vec2[1] -= this.y
        return vec2
    }

    wxy(lx, ly) {
        return this.__.upos([lx + this.x, ly + this.y])
    }

    contact(hitterSolid, resolveContact) {
        /*
        if (hitterSolid instanceof dna.city.pod.MultiSolid) {
            for (let subSolid of hitterSolid._ls) {
                if (this.contact(hitter, subSolid, resolveContact)) return true
            }
            return false
        }
        */

        const wxy = hitterSolid.wxy(0, 0)
        const lxy = this.lxy( wxy[0], wxy[1] )
        const dist = length( lxy[0], lxy[1] )
        if (dist <= this.r + hitterSolid.r) {
            const contactData = {
                dist,
                lxy,
                wxy,
            }
            if (env.debug) {
                contactData.info = `[${this.__.name}@${round(this.__.pos.x)}:${round(this.__.pos.y)}]`
                    + ` <== [${hitterSolid.__.name}@${round(hitterSolid.__.pos.x)}:${round(hitterSolid.__.pos.y)}]`
                    + ` rel::${round(lxy[0])}:${round(lxy[1])}`
            }
            resolveContact(
                this.__,
                this,
                contactData
            )
            return true
        }
        return false
    }

    /*
    lineTouch(px, py, phi) {
        const pxy = this.__.pxy(this.x, this.y)

        const d = abs( cos(phi)*(py - pxy[1]) - sin(phi)*(px - pxy[0]) )
        return (d <= this.r)
    }
    */

    draw() {
        if (!env.showSolids) return
        lineWidth(2)

        if (this.inContact) stroke('#FF0000')
        else stroke ('#FFFF00')

        circle(this.x, this.y, this.r)
    }
}

