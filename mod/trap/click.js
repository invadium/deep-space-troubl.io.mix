function click(e) {
    const entity = lab.pick(e.x, e.y)
    
    if (entity) {
        console.dir(entity)
        
        if (entity.capture) {
           entity.capture()
        }
    }
}
