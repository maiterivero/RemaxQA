var fs = require('fs');
module.exports = 
{
    readJson: function (url) 
    {
    var data = fs.readFileSync(url);
    var object = JSON.parse(data);
    return object;    
    },
    writeJson: function (text, json) 
    {
        var jsonfile = require('json');
        for (i=0; i <11 ; i++){
        jsonfile.writeFile('loop.json', "id :" + i + " square :" + i*i);
        }    
    },
    getRandom: function(min, max) 
    {
    return Math.floor(Math.random() * (max - min)) + min;
    },
    textContentText: function (text, text2) 
    {
        //content is a boolean is true when the first string includes the second one
        
        //replace all space, coma and - in a string
        text = text.replace( /[ ,-]/g, "");
        text2 = text.replace( /[ ,-]/g, "");
        var content = text.toLowerCase().includes(text2.toLowerCase());
        console.log('This text-- ' + text.toLowerCase() + ' --content ');
        console.log('this text-- ' + text2.toLowerCase());
        return content;   
    },
    hours: function () 
    {       
        var d = new Date();       
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var hours = h + "-" + m + "-" + s;
        return hours;       
    }
   
}