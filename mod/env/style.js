const style = {
    background: '#231536',

    font: {
       main: {
           family: 'pixel-operator',
           size:   32,
       },
    }

}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

