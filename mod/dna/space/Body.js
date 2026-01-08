class Body extends sys.LabFrame {

    constructor(st) {
        super( augment({
            pos: {
                x: 0,
                y: 0,
            },
            rot:  math.rnda(),
            mass: 1,

            r:    100,
        }, st) )

        this.attach( new dna.pod.Momentum() )
        this.attach( new dna.pod.AngularMomentum() )
    }

    // translate local vec2 to upper (parent) coordinate system
    //
    // Note: the incoming vec2 is mutated for better efficiency
    //
    // @param {number} lpos - vec2 in local coordinates
    // @returns {array/vec2} - the incoming vec2 translated to the upper (parent) coordinate system
    upos = function(lpos) {
        const angle = this.rot
        const lx = lpos[0] * cos(angle) - lpos[1] * sin(angle)
        const ly = lpos[0] * sin(angle) + lpos[1] * cos(angle)

        lpos[0] = lx
        lpos[1] = ly
        return lpos
    }

    pick(x, y, list, opt) {
        const ls = isArr(list)? list : null
        const fn = isFun(ls)? ls : (isFun(opt)? opt : null)
        if (fn && !fn(this)) return

        if ( distance(this.pos.x, this.pos.y, x, y) <= this.r ) {
            // picked!
            if (ls) ls.push(this)
            return this
        }
    }

}

