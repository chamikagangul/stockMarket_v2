class Core {
    constructor() {
        if (!Core.instance) {
            Core.instance = {
                DATA: {},
                SYMBOLS: [],
                DATA_array:[],
                makeList: () => {
                    Core.instance.DATA_array = []
                    Core.instance.SYMBOLS = Object.keys(Core.instance.DATA);
                    Core.instance.SYMBOLS.forEach(s => {
                        let stock = Core.instance.DATA[s];
                        stock["s"] = s;
                        Core.instance.DATA_array.push(stock);
                    });
                },
                filter : ()=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.filter((stock)=>{
                        
                        return (parseFloat(stock["bidSize"])>0 || parseFloat(stock["askSize"])>0) && parseFloat(stock["o"])<parseFloat(stock["p"]) && parseFloat(stock["p"])>1;
                    });
                },
                rankByPercentage:()=>{
                    Core.instance.DATA_array = Core.instance.DATA_array.sort(GetSortOrder("cp"));
                }
            }
        }
        return Core.instance;
    }
}

//Comparer Function    
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (parseFloat(a[prop]) <  parseFloat(b[prop])) {    
            return 1;    
        } else if (parseFloat(a[prop]) > parseFloat(b[prop])) {    
            return -1;    
        }    
        return 0;    
    }    
} 

module.exports = Core;