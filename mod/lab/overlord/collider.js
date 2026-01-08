function contact(solid, resolve) {
    const ls = lab.port._ls
          
    for (let i = ls.length - 1; i >= 0; i--) {
        const e = ls[i]
        if (e !== solid.__ && !e.dead && e.solid && e._hittable) {
            e.solid.contact(solid, resolve)
        }
    }

}
