let topics={


    fruits:{

        answer:["rambutan","durian","longan","mangosteen","persimmon","sapodilla","pomelo","guava","jocote","jackfruit"],
        hint:["Indonesian region","Nickname is king of fruits", "Soapberry family","Native to Southeast Asia",
        "Name originates from 'dryfruit'","Pear like taste","Looks like a Grapefruit", "Looks like a Pear","Belongs to the cashew family","sticky"]
    },

    basketballNames:
    {
        answer:["pippen", "hardaway","boozer","jokic","bosh","johnson","speights","gasol","leonard","curry"],
        hint:["played with Michael Jordan", "UTEP Two-step","Co-captain of the Ghost Ballers of BIG3 BBall","The Joker","CB4","Earvin","Mo Buckets","The Big Burrito","Fun Guy","Baby-Faced Assassin"]
    },

    bookTitles:
    {
        answer:["atonement","hatchet","euphoria","holes","fences","wonder","hangman","it","artemis","wool"],
        hint:["Author: ‎Ian McEwan","Plane falls in forest","Intense happiness","Digging","Privacy","Discovery","Game","Tag","Greek Goddess","Textile fiber"]
    }

};


let lettersOfWord=[];
let blank="_"+" ";
let lives = 4;
let counter=0;
let savedBanana=0;
let killedBanana=0;
let letterMatch;
let imagePicker=["firsttree.png","secondtree.png","thirdtree.png","fourthtree.png","fifthtree.png"];
let blankCounter=document.getElementById("blanks");
let blankMatch=blankCounter.textContent.replace(/\s/g, "");
let dropdown=document.getElementById("topicSelectionButton")
let word;
let chosen="nullOption";
let test=false;

function randomWord(){

    random=Math.floor(Math.random() * Math.floor(topics[chosen].answer.length))
    return topics[chosen].answer[random];

    
 }

//remove specific item in array function
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
String.prototype.unquoted = function (){return this.replace (/(^")|("$)/g, '')}


//remmebers topic that client picked.
dropdown.addEventListener("change", generateData);
function generateData(event) {
    if (dropdown.value == 'fruits') {
    chosen="";
    chosen="fruits";
    
    } else if (dropdown.value === 'basketball') {
        chosen="";
        chosen='basketballNames';
    } else if (dropdown.value === 'bookTitles') {
        chosen="";
        chosen="bookTitles";
    }
    else if (dropdown.value==='nullOption')
    {
        chosen="";
        chosen="nullOption";
    }
    
 //goes up the scope to windowobject when you don't use "var" or "let" keyword
hint=topics[chosen].hint

    
  }


  $("#startGameButton").on("click",function(){

    startGame()
  })

function startGame(){

if(chosen!=="nullOption"){
    $(".overlay").hide();
    $("#optionDiv").show();
}
else{
    alert("Please choose a topic")
}
    printBlanks();   
}



//On every click, check to move onto next word
document.addEventListener("click",function(){


    if(blankCounter.textContent.replace(/\s/g, "")===letterMatch){
        savedBanana++;
        $("#savedBanana").text("Saved Banana:");
        $("#savedBanana").append(savedBanana);
        setTimeout(function(){ resetGame() }, 1500);
    }

    
    if(savedBanana+killedBanana===10)
    {     
        var sendData =[savedBanana, killedBanana];
        localStorage.setItem("storageName",sendData);
        window.open("gameOver.html","_self");
    }

})


//reset elements and variables
function resetGame()
{
    hint.splice(hint.indexOf(hint[topics[chosen].answer.indexOf(word)]), 1);
    topics[chosen].answer.remove(word);
    blankCounter.innerText=("");
    $('img[src="' + "assets/images/"+imagePicker[counter]+'"]').attr('src', "assets/images/"+imagePicker[0]);
    $("#hint").html("<summary>hint</summary>");
    $('#hint').prop("open", "");
    $('#optionDiv [style]').removeAttr('style');
    $('#optionDiv').children().prop("disabled", true);
    $('#optionDiv').children().removeAttr("disabled");
    counter=0;
    lives=4;
    randomWord();
    printBlanks();
}


function printBlanks()
{

randomWord()
word=randomWord();

lettersOfWord=[];
for(i=0; i<word.length; i++)
    {
      let li=$("<li>").attr("class", word[i]);
        $(li).append(blank);
        $("#blanks").append(li);


//push each letter to different array to match later
    lettersOfWord.push(word[i]);   
    }

    letterMatch=lettersOfWord.join().replace(/,/g, '');


    $("#hint").append(hint[topics[chosen].answer.indexOf(word)]);
}



//put alphabet to screen
let alphabet="abcdefghijklmnopqrstuvwxyz".split("");
for(i=0; i<26;i++)
{
    let button=$("<button>").append(alphabet[i]).attr("id", alphabet[i]);
    $("#optionDiv").append(button).hide(); //hide before game starts

}


//match clicked-alphabet with chosen word
$("#optionDiv").on("click", function(ev){

    let targetLetter= ev.target.textContent

    if (!$("#blanks").children().find("class")===0){
alert("error");};

        if (lettersOfWord.includes(targetLetter))
        {

            $("."+targetLetter).replaceWith(targetLetter);
            $("#"+targetLetter).attr("style", "opacity:0.25",).prop('disabled', true);
    
          
            }
        else{
      
            $("#"+targetLetter).attr("style", "background-color:red").prop('disabled', true);
            lives=lives-1;
            $('img[src="' + "assets/images/"+imagePicker[counter]+'"]').attr('src', "assets/images/"+imagePicker[counter+1])
            counter=counter+1;
           
        }

        if(lives===0)
        { 

            //reload everything but stats div
            killedBanana++;
            $("#killedBanana").text("Killed Banana:");
            $("#killedBanana").append(killedBanana);
            setTimeout(function(){ resetGame() }, 1500);
           
            
            
        }
})