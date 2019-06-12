
let fruits=["rambutan","durian","longan","mangosteen","persimmon","sapodilla","pomelo","guava","jocote","jackfruit"];

let hint=["Indonesian region","Nickname is king of fruits", "Soapberry family","Native to Southeast Asia",
"Name originates from 'dryfruit'","Pear like taste","Looks like a Grapefruit", "Looks like a Pear","Belongs to the cashew family","sticky"];

let pressedArray=[];
let randomFruit;
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
let random=Math.floor(Math.random() * Math.floor(fruits.length));



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


//On every click, check to move onto next word
document.addEventListener("click",function(){

    if(blankCounter.textContent.replace(/\s/g, "")===letterMatch){
        savedBanana++;
        $("#savedBanana").text("Saved Banana:");
        $("#savedBanana").append(savedBanana);
        setTimeout(function(){ resetGame() }, 1500);
    }
})


function resetGame()
{
    hint.splice(hint.indexOf(hint[fruits.indexOf(randomFruit)]), 1);
    fruits.remove(randomFruit);
    blankCounter.innerText=("");
    $('img[src="' + "assets/images/"+imagePicker[counter]+'"]').attr('src', "assets/images/"+imagePicker[0]);
    $("#hint").html("<summary>hint</summary>");
    $('#hint').prop("open", "");
    $('#optionDiv [style]').removeAttr('style');
    $('#optionDiv').children().prop("disabled", true);
    $('#optionDiv').children().removeAttr("disabled");
    counter=0;
    lives=4;
    random=Math.floor(Math.random() * Math.floor(fruits.length));
    printBlanks();
}

function printBlanks()
{
randomFruit=fruits[random];
lettersOfWord=[];
for(i=0; i<randomFruit.length; i++)
    {
      let li=$("<li>").attr("class", fruits[random][i]);
        $(li).append(blank);
        $("#blanks").append(li);

   
//push each letter to different array to match later
    lettersOfWord.push(fruits[random][i]);   
    }

    letterMatch=lettersOfWord.join().replace(/,/g, '');

    console.log(lettersOfWord+"teehee")

    $("#hint").append(hint[fruits.indexOf(randomFruit)]);
}

//put alphabet to screen
let alphabet="abcdefghijklmnopqrstuvwxyz".split("");
for(i=0; i<26;i++)
{

let button=$("<button>").append(alphabet[i]).attr("id", alphabet[i]);

$("#optionDiv").append(button);

}


//match clicked-alphabet with chosen word
$("#optionDiv").on("click", function(ev){

    let targetLetter= ev.target.textContent

    if (!$("#blanks").children().find("class")===0){
alert("hello");};

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
           
            
            console.log("hello");
            
        }
})



printBlanks();

//once all words in array are finished. Game finished and confete and bring new page in
