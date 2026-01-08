function environment() {
    lab.background = env.style.background

    Object.keys(env.config).forEach(k => {
        if (k.startsWith('debug') || k.startsWith('trace') || k.startsWith('show')) {
            env[k] = env.config[k]
        }
    })
}
