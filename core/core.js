class Core{
    constructor(){
        if(!Core.instance){
            Core.instance={
                DATA : {},
                SYMBOLS : []
            }
        }
        return Core.instance;
    }
}

module.exports = Core;