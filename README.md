# Text-Generator

<h1>A brief summary of this project and the problems of a Markov-Text-Generator without additional logic</h1>
<p>
  
 This webiste uses Markov chains to create a probability matrix of the sample text. Then it follows the probability graph through weighted random selection to generate new text.
The Bigger the sample size, the better the outcome, you can test out this website here https://arkrez.github.io/Text-Generator/ 
 </p>
<p>
If you know about Markov chains, then you have probably figured out that this website is essentially frankensteining a bunch of text together and it has no logic or thought behind it. That is correct, if you input text into this website that follows a linear format, [1, 2, 3, 4, 5, 6] and does not create any cycles or multiple references to the same item ie [1, 2, 1] is a cycle and [1, 2, 3, 2] is a cycle that references and item multiple times. Then the output would be linear segments of the input (there is logic in the code that picks a random index if the current index doesn't lead to any other word ie 6). An example output would be 1, 2, 3, 4, 5, 6, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 2, 3, 4, 5, 6, 5, 6. As you can see, the chain links itself back to another link in the chain, then begins to follow that path until it reachs no oter link 6, where it will again link itself to another random index in the chain only to follow that linear path again. 
</p>
<p>
The reason for a large dataset is so that you have multiple cycles and inside of the markov chains, so that although parts are linear, there is so much variation between the chunks of linear chain, that it then appears to cease being linear. For example [1, 2, 1, 3, 1, 4, 2, 5, 3, 6, 4, 5, 6, 7, 8, 9, 10] This chain is longer and most states transition to a state the is referenced multiple times and also references multiple other states. The result is a jumble of number, but due to the last four elements, there can exist a linear chain of length 5, where if the state ever becomes 6, then there is a moderate probability that 7 will follow, and if 7 follows, then the consecutive numbers in the chain will have to be 7, 8, 9, 10. 
</p>
<p>
There is also another problem with this website, the data structure that was used was used just to prototype this idea. it is far from the optimal data structure. To create the Markov table that lets me identify probability, I had to create a matrix of all of the unique words in the sample text. This is okay for small samples 1, 2, 3 will have a 3x3 matrix, but larger data sets. Sat a 20,000 word short story will have upwards of 9,000 unique words. This means that we have a 9000x9000 matrix. To put it simply, just to run our program we need n^2 space. Then the time to run through the program also ends up being n^2. The result is a program the is extremley ineffecient time and space wise and has th epotential to crash itself if th einput size is too large. 
</p>
<p>
A way to solve this problem is to instead store each word as an object that holds an array of the possible consecutive words. Then all that is needed to run the program is to pick a random word and follow its object chain. This structure is called a linked list and makes sense for being used with Markov chains. The time and space complexity is probably a lot more complicated now and exceeds my current knowledge, but basically it is O(nm) and the space is also O(nm) where n represents the words in the text and m represents the average words that any word points to.
</p>
<h2>Next Steps For this Project</h2>
The next step for this project is to simplify the time and space complexity, then add some logic that can identify sentence and writing structre, then create sentence/paragraph/page/dialogue/etc. templates that the markov chain can follow to mimic actual human writing. To be more specific, the chain will be mimicing the author(s). 

<h2>It's not actually a Text-Generator?</h2>
<p>I think what is really cool about this project, is that despite its name "Text-Generator", it's actually more appropriate to call this a Markov Chain Simulator. What this means is that the frequency of words in your input is going to be mapped to a Markov Matrix of Probabilities. Then a while loop executes 200 times and simulates state changes between the words in the input text. This means that if you would like to simulate weather transitions, then all you need to do is input text like this "Rainy Cloudy Sunny Cloudy Rainy". The result is a chain that can move from Rainy -> Cloudy -> Dry -> Cloudy -> Rainy. The probability of the switches is dependent on the frequency of how many times they appear in the sample text.</p> 
  
<h2>Proofs</h2>
<p>There are proofs included in the source code, as of writing this there is only one proof that given an array of probabilities it selects an element at the same frequency as that element. Fn[i] = n[i]. I don't know the correct notation, but basically the Frequncy of the element at n[i] equals the value of n[i] 
I will add more proofs as I work on this project, I'm not sure if I will continue to work on it outside of some basic css/html to amke it look pretty.</p>
