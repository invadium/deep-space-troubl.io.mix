function environment() {
    lab.background = env.style.background

    Object.keys(env.config).forEach(k => {
        if (k.startsWith('debug')) {
            env[k] = env.config[k]
        }
    })
}
