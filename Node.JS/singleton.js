var singleton = function singleton(){
    var contents = {};
    this.set = function(key, data, expire){
        expire = expire || 7200000; //두시간
        
        contents[key] = {
        data: data,
        timer: setTimeout(function(){
                          this.remove(key)
                          }.bind(this), expire)
        };
    };
    
    this.get = function(key){
        if(typeof(contents[key]) !== "undefined"
           && contents[key] !== null
           && typeof(contents[key].data) !== "undefined"
           && contents[key].data !== null){
            return contents[key].data;
        }
        return null;
    };
    
    this.remove = function(key){
        if(typeof(contents[key]) !== "undefined"
           && contents[key] !== null
           && contents[key].timer !== "undefined"
           && contents[key].timer !== null){
            clearTimeout(contents[key].timer);
            delete contents[key];
        }
    };
    
    this.getStoreContent = function(){
        return contents;
    };
    
    if(singleton.caller !== singleton.getInstance){
        throw new Error("Singleton !!");
    }
};

singleton.instance = null;
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
};

module.exports = singleton.getInstance();
