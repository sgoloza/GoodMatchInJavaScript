const functions = require('./functions');
const csv = require("csv-parser")
const fs = require("fs")
const listofPlayers = [];

var female = [];
var male =[];
fs.createReadStream("playersList.csv")
.pipe(csv({}))
.on("data",function(data){
    listofPlayers.push(data)})
.on("end",()=>{
    listofPlayers.forEach(player => {
        if ( !(male.includes(player.Name)) && (player.Gender.toString().trim().toLowerCase() ==="m")  ){
            male.push(player);
        }else if(!(female.includes(player.Name))){
            female.push(player);
        }
    });
    var arrayOfResult = []; // create an empty array
    male.forEach(mymale => {
        female.forEach(myfemale => {
            var str1 = mymale.Name;
            var str2 = myfemale.Name;
            var myreslt = functions.calculateMatchPercentage(str1,str2);
           if( myreslt=== false){
                console.log("---------------------------------------------------------------------------------------------------------------")
                console.log( `Player names for ${str1} and ${str2}  should only contain alphabetic characters. This match will be excluded.`);
                console.log("---------------------------------------------------------------------------------------------------------------\n")
           }else{
              arrayOfResult.push(`${myreslt} ${str1} matches ${str2}`); 
           }
            
            
        });
    });
    arrayOfResult = arrayOfResult.sort().reverse();
var ts = Date.now();
var date_ob = new Date(ts);
    fs.appendFile("output.txt", `\n-------------Good Match  Result for ${ date_ob.getFullYear()}-${date_ob.getMonth() + 1}-${date_ob.getDate()} -------------\n`,function(err){
        if(err) throw err;
        });
    arrayOfResult.forEach(sortedResult => {
        if( parseInt(sortedResult.substr(0, 2)) > 80 ){
            var sentence = `${ sortedResult.replace(sortedResult.substr(0, 3),"")} ${sortedResult.substr(0, 2)}% , good match\n`;
            fs.appendFile("output.txt", sentence,function(err){
                if(err) throw err;
                });
        }else{ 
            var sentence = `${sortedResult.replace(sortedResult.substr(0, 3),"")} ${sortedResult.substr(0, 2)}%\n`;
            fs.appendFile("output.txt", sentence,function(err){
            if(err) throw err;
            });
        }
   });
   fs.readFile( "output.txt", (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
});
});






