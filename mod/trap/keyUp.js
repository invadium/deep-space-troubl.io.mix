function cutOff(action) {
    if (!env.playerShip) return
    env.playerShip.playerControl.cutOff(action)
}

function keyUp(e) {

    switch(e.code) {
        case 'KeyW': cutOff(dry.UP);    break;
        case 'KeyA': cutOff(dry.LEFT);  break;
        case 'KeyS': cutOff(dry.DOWN);  break;
        case 'KeyD': cutOff(dry.RIGHT); break;
    }
}
