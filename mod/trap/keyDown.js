function actuate(action) {
    if (!env.playerShip) return
    env.playerShip.playerControl.actuate(action)
}

function keyDown(e) {

    switch(e.code) {
        case 'KeyW': actuate(dry.UP);    break;
        case 'KeyA': actuate(dry.LEFT);  break;
        case 'KeyS': actuate(dry.DOWN);  break;
        case 'KeyD': actuate(dry.RIGHT); break;
    }

}
