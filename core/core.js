class Core{
    constructor(){
        if(!Core.instance){
            Core.instance={
                DATA : []
            }
        }
        return Core.instance;
    }
}

module.exports = Core;