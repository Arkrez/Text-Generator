//5.26.22 Inside of Generate Text there is a code snippet that determines what word should come next
//The probability of the following word is based off of its row in the column 
//To determine what word should come next, we pick a random number between 0 and 1
//Then we subtract each cell of the row until the random number == 0
//After that we return the word at words[counter] as our new word
//The proof that this works is below

let counter = 0;
let dist = {};
let divisor = 1000000;
//Matrix must sum to one
let matrix = [.5, .1,.1,.05,.2,.05]
while(counter < divisor){
    let i = 0;
    let rand = Math.random();
    while(rand > 0){
        rand -= matrix[i];
        if(rand <= 0) break;
        i++;
    }
    dist[i] = dist[i]!== undefined? dist[i]+1: 1;
    counter++;
}
for(let i = 0; i < 6; i++){
    dist[i] = dist[i]/divisor;
}