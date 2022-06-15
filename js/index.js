const questionText = document.getElementById("question")
const options = document.getElementsByClassName("options")
const answers = [...options]
const image = document.getElementById("image")
const clickeableAnswers = document.getElementById("options-container")
const nextButton = document.getElementById("next")
const resultBox = document.getElementById("results")
const resultTitle = document.getElementById("results-title")
const resultText = document.getElementById("results-count")
const timer = document.getElementById("timer")
const checkIcon = new Image
checkIcon.src = "./country-quiz-master/outline_check_black_24dp.png"
checkIcon.classList.add("icon")
const xIcon = new Image
xIcon.src = "./country-quiz-master/outline_close_black_24dp.png"
xIcon.classList.add("icon")
let interval;
let click;
const regions = ["america", "europe"]

function startCount() {
    let correctCount = 0
    return function(type) {
        if (type == 1) {
            return correctCount++
        } else {
            return correctCount = 0;
        }
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function markAsCorrectAnswer(ev) {
    ev.target.classList.add("correct")
    ev.target.appendChild(checkIcon)
}

function markAsWrongAnswer(ev, goodAnswer) {
    ev.target.classList.add("wrong")
    ev.target.appendChild(xIcon)
    const correctAnswer = answers.find( item => item.innerText == goodAnswer)
    correctAnswer.classList.add("correct")
    correctAnswer.appendChild(checkIcon)
}

clickeableAnswers.addEventListener("mouseover", (ev) => {
    if (ev.target == clickeableAnswers) return false
    ev.target.classList.add("mouseover")    
})

clickeableAnswers.addEventListener("mouseout", (ev) => {
    if (ev.target == clickeableAnswers) return false
    ev.target.classList.remove("mouseover")
})

clickeableAnswers.addEventListener("click", (ev) => {

    if (ev.target == clickeableAnswers) return false

    clearInterval(interval)

    const answers = [...clickeableAnswers.children]
    if (answers.some( item => item.classList.contains("correct"))) return false
    
    const answerWasCorrect = click(ev)

    if (answerWasCorrect) {
        nextButton.classList.add("show")
        correctAnswersCount(1)
    } else {
        setTimeout( getResults, 2500, "Results")
    }
})

function getResults(title) {
    quizbox.style.display = "none"
    resultBox.style.display = "flex"
    resultTitle.innerHTML = title
    resultText.innerHTML = `You got <span class="count">${correctAnswersCount(1)}</span> correct answers.`
    correctAnswersCount(0)
}

const correctAnswersCount = startCount()

function startQuestion() {

    timer.innerHTML = "15 sec"

    if (interval) clearInterval(interval)

    const question = random(0, 2)
    
    fetch(`https://restcountries.com/v3.1/region/${regions[random(0,1)]}?fields=name,capital,flags,subregion`)
        .then( countriesData => {
            if (countriesData.ok) {
                return countriesData.json()
            } else {
                setTimeout( function(){
                    startQuestion()
                }, 1000)
                return false
            }
        })
        .then( countriesData => {

            answers.forEach( item => {
                item.classList.remove("correct", "wrong")
            })
            resultBox.style.display = "none"
            quizbox.style.display = "block"
            image.style.display = "none"
            nextButton.classList.remove("show")

            let sec = 15
            interval = setInterval(() => {
                timer.innerHTML = `${--sec} sec`    
                if (sec == 0) {
                    clearInterval(interval)
                    getResults("Time's out!")
                }
            }, 1000);

            const selected = countriesData[ random(0, countriesData.length - 1) ]
            
            elaborateQuestion(countriesData, selected, question)

            function isCorrect() {
                type = question;
                country = selected;
                return function(ev) {
                    const answers = [...clickeableAnswers.children]
                    const clickedAnswerText = ev.target.innerText
                    if (type == 0) {
                        clickedAnswerText == selected.name.common ? markAsCorrectAnswer(ev) : markAsWrongAnswer(ev, selected.name.common)
                    } 
                    if (type == 1) {
                        clickedAnswerText == selected.capital ? markAsCorrectAnswer(ev) : markAsWrongAnswer(ev, selected.capital)
                    } 
                    if (type == 2) {
                        clickedAnswerText == selected.name.common ? markAsCorrectAnswer(ev) : markAsWrongAnswer(ev, selected.name.common)                       
                    }
                    return Boolean(ev.target.classList.contains("correct"))
                }
            }
            click = isCorrect()
            
        })
        
}



function elaborateQuestion(allCountries, countrySelected, type) {

    const possibleAnswers = allCountries.filter( country => {
        if (country.name.common === countrySelected.name.common) return false
            
        return country.subregion === countrySelected.subregion
    })
    

    while (possibleAnswers.length > 3) {
        possibleAnswers.splice( random(0, possibleAnswers.length), 1 )
    }

    possibleAnswers.splice( random(0, 3), 0, countrySelected)    
    
    if (type === 0) {
        const text = `${countrySelected.capital} is the Capital of...`
        questionText.innerHTML = text
        
        answers.forEach( (item, index) => {
            item.innerHTML = possibleAnswers[index].name.common
        })
    } else if (type === 1) {
        const text = `The Capital of ${countrySelected.name.common} is...`
        questionText.innerHTML = text

        answers.forEach( (item, index) => {
            item.innerHTML = possibleAnswers[index].capital
        })
    } else if (type === 2) {
        image.src = countrySelected.flags.png
        image.style.display = "block"

        const text = "Which country does this flag belong to..?"
        questionText.innerHTML = text

        answers.forEach( (item, index) => {
            item.innerHTML = possibleAnswers[index].name.common
        })
    }
}

startQuestion()