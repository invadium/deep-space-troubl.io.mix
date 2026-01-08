function scene() {

    // create some asteroids
    let R = 2000
    for(let i = 0; i < 101; i++) {
        const dist = R * rnd(),
              dir = math.rnda()
        lab.port.spawn('Asteroid', {
            pos: {
                x: dist * cos(dir),
                y: dist * sin(dir),
            },
            r: 30 + 70 * rnd(),
        })
    }

    // create some ships
    R = 700
    for(let i = 0; i < 7; i++) {
        const dist = R * rnd(),
              dir = math.rnda()
        lab.port.spawn('Ship', {
            pos: {
                x: dist * cos(dir),
                y: dist * sin(dir),
            },
        })
    }
}
