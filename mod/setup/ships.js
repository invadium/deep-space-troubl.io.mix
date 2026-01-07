function ships() {

    for(let i = 0; i < 11; i++) {
        lab.spawn('Asteroid', {
            x: rnd() * ctx.width,
            y: rnd() * ctx.height,
            r: 30 + 70 * rnd(),
        })
    }

    lab.spawn('Ship', {
        x: 150,
        y: 250,
    })

    lab.spawn('Ship', {
        x: 400,
        y: 550,
    })

    lab.spawn('Ship', {
        x: 800,
        y: 450,
    })

    lab.spawn('Ship', {
        x: 740,
        y: 740,
    })
    
}
