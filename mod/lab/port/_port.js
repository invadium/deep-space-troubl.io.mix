const _port = {
    Z:     11,
    DNA:  'SlideCamera',
    name: 'port',

    zoomOnPlusMinus: true,

    pick: function(ux, uy, list, opt) {
        const ls = this._ls,
              lx = this.lx(ux),
              ly = this.ly(uy)

        let last
        for (let i = ls.length - 1; i >= 0; i--) {
            const e = ls[i]
            if (e.pick) {
                const picked = e.pick(lx, ly, list, opt)
                if (picked) last = picked
            }
        }

        return last
    },

    // follow a target if one is defined
    // Shouldn't be called manually.
    // It is called automatically as a part of evo(dt) process
    // @params {number} dt - delta time in seconds
    evoFollow: function(dt) {
        const target = this.target.pos
        let dx = target.x - this.x
        let dy = target.y - this.y
        if (abs(dx) < this.targetingPrecision
                && abs(dy) < this.targetingPrecision) {

            // camera is within precision range
            if (this.pinOnTarget) {
                this.x = target.x
                this.y = target.y
            }
            if (!this.keepFollowing) this.target = null

        } else {

            let fi = Math.atan2(dy, dx);
            const ndx = Math.cos(fi) * this.speed / this.scale * dt
            const ndy = Math.sin(fi) * this.speed / this.scale * dt

            this.x += abs(ndx) < abs(dx)? ndx : dx
            this.y += abs(ndy) < abs(dy)? ndy : dy
        }
    }
}

