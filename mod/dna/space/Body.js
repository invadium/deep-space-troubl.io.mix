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

