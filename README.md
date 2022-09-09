# Country-quiz
This is a Web Game idea that I took from [devchallenges.io](https://devchallenges.io/)

## How does it work?
1. Using *promises*, it fetches data using the [REST Countries API]( https://restcountries.com)

2. It randomly selects one country out of every single one received in JSON and one out of three types of questions available for the game

3. It formulates the question with the chosen country, and it choses another 3 countries that are wrong answers

4. It randomly prints these 4 countries into the game

5. If you click the right answer, you gain 1 point and repeat the process. Your points get restarted when you lose.

	**Extra:** It encapsulates the selected country and the type of question in a closure instead of having them in the global scope, just to be sure to not letting cheating so easy.

## What technologies did I use?
- HTML & CSS
- Vanilla JavaScript
