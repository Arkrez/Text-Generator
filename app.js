const sample = document.querySelector("#sample-text");
const createTBtn = document.querySelector(".create-table");
const map = {};
const createTable = function(words){
    
    
    const matrix = [];
    for(let i = 0; i < words.length; i++)
    {
        matrix[i] = new Array(words.length).fill(0);
        map[words[i]] = i;
    }
    console.log(map)
    return matrix;
    
}
const findWords = function(textSample = "")
{
    let builder = [];
    let row = new Set();
    
    let badWords = new Set(" ")
    var textSample = textSample.replace(/(\r\n|\n|\r)/gm, " ")
    for(let i = 0; i < textSample.length; i++)
    {
        
        if(!badWords.has(textSample[i]))
        {
            builder.push(textSample[i])
        } else{
            
            row.add(builder.join(''));
            builder = [];
        }
    }
    if(builder.length !== 0) row.add(builder.join(''))
    return [...row];

}
const createMarkovTable = function(matrix, textSample = ""){
    let builder = [];
    let badWords = new Set(" ")
    let found = false;
    let prev = ""
    var textSample = textSample.replace(/(\r\n|\n|\r)/gm, " ")
    for(let i = 0; i < textSample.length; i++)
    {
        
        if(!badWords.has(textSample[i]))
        {
            builder.push(textSample[i])
        } else if(found){
            let curr = builder.join('');
            matrix[map[prev]][map[curr]] += 1;
            prev = curr;
            builder = [];
        } 
        else{
            found = true;
            prev = builder.join('');
            builder = [];
        }
    }
    if(builder.length !== 0){
        let curr = builder.join('');
        if(prev != "")
            matrix[map[prev]][map[curr]] += 1;
        else matrix[0][map[curr]] += 1;
        prev = curr;
        builder = [];
    }
    return matrixToPercent(matrix);
}

const matrixToPercent = function(matrix){
    let i = 0;
    let divisor = 1;
    for(let j = 0; j < matrix.length; j++)
    {
        let sub = 0;
        let sum = 0;
    
        for(let k = 0; k < matrix[0].length; k++)
        {
                
            sum += matrix[j][k];
            if(k <= j){
                sub+=matrix[j][k];
            }
        }
        if(sum === 0){
            
            continue;
        }
        divisor=divisor *sum-sub;
        for(let k = 0; k < matrix[0].length; k++)
        {
            matrix[j][k] /= sum;
            matrix[j][k] = matrix[j][k].toFixed(4)
        }
    }


    return matrix;
}

const generateText = function(matrix, words){
    let text = ""
    let word = words[0];
    let i = 0;
    let newWord = words[0];
    while(i < 200)
    {
        console.log(i)
        let rand = Math.random().toFixed(4);
        let diff = 1;
        let j = 0;
        
        let changed = false;
        
        for(j = 0; j < matrix[0].length; j++)
        {
            if(matrix[map[word]][j]=== 0) continue;
            let x = Math.abs(rand - matrix[map[word]][j]).toFixed(4);
           
            if(rand > x){
                changed = true;
                rand = x;
            
                newWord = words[j];
                
            }
            
        }
        
        if(!changed){
            let x = Math.floor(Math.random() * words.length);
            
            newWord = words[x];
            console.log(i)
        }
        
        word = newWord;
        text += word + " ";
        i++;
    }
    return text;
}
createTBtn.addEventListener('click', function(e){
    e.stopPropagation();
    let newDiv = document.createElement("div");
    let words = findWords(sample.value)
    let table = createTable(words);
    let markov = createMarkovTable(matrixToPercent(table), sample.value);
    console.log(markov)
    let text = generateText(markov, words)
    newDiv.textContent = text;
    document.querySelector("body").append(text);
})