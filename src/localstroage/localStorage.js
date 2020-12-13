
const getItem = function(key){
    return localStorage.getItem(key);
}

const setItem = function(key,value){
    localStorage.setItem(key,value);
}

export default{
    getItem,
    setItem
}