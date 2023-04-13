window.application = {
    blocks: {},
    screens: {},
    renderScreen: function(screen){
        $('.app').empty()
        this.screens[screen]()
    },
    renderBlock: function(parent, block) {
        this.blocks[block](parent)
    }
}

const $app = window.application