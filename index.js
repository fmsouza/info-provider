var getInfo        = require("./operations").getInfo;
var saveToDataBase = require("./operations").saveToDataBase;
var InfoBus        = require("./infoBus")
var prepareData    = require("./operations").prepareData;
var startDataBase  = require("./operations").startDataBase;
var getFiles       = require("./operations").getFiles;
var line, numberLines;
var countFiles = 0;
var countSuccess = 0;


startDataBase(function(err, collection){
    if(err) console.log(err);
    else{
       getInfo(function(lines, index, numberFiles){
        
            numberLines = lines.length;
            console.log("Numero de linhas: " + numberLines);
            
            var busInfos = [];
            for(line = 0 ; line < numberLines; line++){
                var response = prepareData(lines[line]);
                busInfos.push(response);   
            }
            saveToDataBase(busInfos, collection, function(err, response) {
                if(err) console.log(err);
                else{
                    console.log(++countSuccess+" [SUCCESS] "+response.ops[0].sign);
				    //if(index===numberFiles-1) process.exit();
                }
            });
        })
    }    

})


/*getFiles(function(files){
    for(var i = 0; i < files.length; i++)
    console.log(files[i]);
})*/

