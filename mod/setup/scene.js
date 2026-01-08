function scene() {

    // create some asteroids
    let R = 1000
    for(let i = 0; i < 15; i++) {
        const dist = R * rnd(),
              dir = math.rnda()

        const asteroid = lab.port.spawn('Asteroid', {
            pos: {
                x: dist * cos(dir),
                y: dist * sin(dir),
            },
            r: round(30 + 70 * rnd()),
        })

        // resolve collisions
        lab.overlord.collider.contact(asteroid.solid, (hitter, contactSolid, contactData) => {
            log(`${asteroid.name} in contact with ${hitter.name}, DELETE!!!`)
            kill(asteroid)
        })
    }

    // create some ships
    R = 700
    for(let i = 0; i < 2; i++) {
        const dist = R * rnd(),
              dir = math.rnda()

        const ship = lab.port.spawn('Ship', {
            pos: {
                x: dist * cos(dir),
                y: dist * sin(dir),
            },
        })

        // resolve collisions
        lab.overlord.collider.contact(ship.solid, (hitter, contactSolid, contactData) => {
            log(`${ship.name} in contact with ${hitter.name}, DELETE!!!`)
            kill(ship)
        })
    }
}
