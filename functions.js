function count(self, substr) {// counts how many times the character appears in string. credits to stringjs.com
    var count = 0;
    var pos = self.indexOf(substr);
  
    while (pos >= 0) {
      count += 1;
      pos = self.indexOf(substr, pos + 1);
    }
    return count+"";
  }
function stringContainsNumber(string) { // checks if a string contains numbers , credits to thispointer.com
    return /\d/.test(string);
}
function nameNotEmpty(playername) {
    if(playername ==="" || playername === null)
        return false;
    else
        return true; // checks if the player name is empty or not
}
function getCountedChars(_match_sentence){
    var _countChars = "";
    var strArray = _match_sentence.split('');
    var len =0;
    if(strArray.length % 2 === 0){
       
        len = (strArray.length/2);
    }else{
        
        len = parseInt(( strArray.length / 2) - 0.5);
       
    }
   
    for(var i = 0 ; i < len ; i++){
        if(  !(strArray.length  % 2 === 0) && (i + 1 === len )){
            _countChars += (parseInt(strArray[len-1]) + parseInt(strArray[len +1]));
            _countChars += (parseInt(strArray[len]));
           return _countChars;
        }else {
            _countChars += (parseInt(strArray[i]) + parseInt(strArray[strArray.length-1-i]));
        } 
    }
   
    return  _countChars;
}
function getMatchPercentage(match_sentence){
    var _sentence = "";
   
    _sentence = match_sentence;
     if( ( _sentence.length < 3)){
        return _sentence;
    }else{
     var sum = getCountedChars(_sentence);
        
       return getMatchPercentage(sum);
    }
}
function calculateMatchPercentage(name1,name2) {
    if((!stringContainsNumber(name1) && !stringContainsNumber(name2)) && (nameNotEmpty(name1) && nameNotEmpty(name2))){
        var sentence = name1.toLowerCase().trim()+"matches"+name2.toLowerCase().trim();
        var _countChars = "";
        while(!(sentence === "")){
            _countChars += count(sentence,sentence.charAt(0)) ; // count how mant times the character appear on the senetance.
          
            sentence = sentence.replaceAll(sentence.charAt(0),""); // replaces character with an empty one after being counted.
        }
        return  getMatchPercentage( _countChars);
    }else{
        return false;
    }
}
function compare(match1_sentence, match2_sentence) {
    return match1_sentence.localeCompare(match2_sentence)
}
module.exports.comparableFunction =  compare;
module.exports.calculateMatchPercentage =  calculateMatchPercentage;