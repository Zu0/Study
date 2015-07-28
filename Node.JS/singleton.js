var session = function session(){
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
           && contents[key].x !== null){
            clearTimeout(contents[key].timer);
            delete contents[key];
        }
    };
    
    this.getStoreContent = function(){
        return contents;
    };
    
    if(session.caller !== session.getInstance){
        throw new Error("one instance!!");
    }
};

session.instance = null;
session.getInstance = function(){
    if(this.instance === null){
        this.instance = new session();
    }
    return this.instance;
};

module.exports = session.getInstance();
