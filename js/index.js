const questionText = document.getElementById("question")
const options = document.getElementsByClassName("options")
const answers = [...options]
const image = document.getElementById("image")
const clickeableAnswers = document.getElementById("options-container")
const nextButton = document.getElementById("next")
const resultBox = document.getElementById("results")
const resultText = document.getElementById("results-count")
const checkIcon = new Image
checkIcon.src = "/country-quiz-master/outline_check_black_24dp.png"
checkIcon.classList.add("icon")
const xIcon = new Image
xIcon.src = "/country-quiz-master/outline_close_black_24dp.png"
xIcon.classList.add("icon")
let dontCheat;
let click;

function closure() {
    let correctCount = 0
    return function(type) {
        console.log(correctCount)
        // debugger
        if (type == 1) {
            return correctCount++
        } else {
            return correctCount = 0;
        }
    }
}

const correctCount = closure()

function startQuestion() {

    const question = random(0, 2)
    
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion")
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

            const selected = countriesData[ random(0, 249) ]
            switch (question) {
            case 0:
                elaborateQuestion(countriesData, selected, question)
                break;
            case 1:
                elaborateQuestion(countriesData, selected, question)
                break;
            case 2:
                elaborateQuestion(countriesData, selected, question)
                break;
            }

            dontCheat = function() {
                type = question;
                country = selected;
                return function(ev) {
                    const answers = [...clickeableAnswers.children]
                    if (type == 0) {
                        if (ev.target.innerText == selected.name.common) {
                            ev.target.classList.add("correct")
                            ev.target.appendChild(checkIcon)
                        } else {
                            ev.target.classList.add("wrong")
                            ev.target.appendChild(xIcon)
                            const correctAnswer = answers.find( item => item.innerText === selected.name.common)
                            console.log(correctAnswer)
                            correctAnswer.classList.add("correct")
                            correctAnswer.appendChild(checkIcon)
                        }
                    } else if (type == 1) {
                        if (ev.target.innerText == selected.capital) {
                            ev.target.classList.add("correct")
                            ev.target.appendChild(checkIcon)
                            
                        } else {
                            ev.target.classList.add("wrong")
                            ev.target.appendChild(xIcon)
                            console.log(selected.capital)
                            const correctAnswer = answers.find( item => item.innerText == selected.capital)
                            correctAnswer.classList.add("correct")
                            correctAnswer.appendChild(checkIcon)
                        }
                    } else if (type == 2) {
                        if (ev.target.innerText == selected.name.common) {
                            ev.target.classList.add("correct")
                            ev.target.appendChild(checkIcon)
                        } else {
                            ev.target.classList.add("wrong")
                            ev.target.appendChild(xIcon)
                            console.log(selected.name.common)
                            const correctAnswer = answers.find( item => item.innerText == selected.name.common)
                            correctAnswer.classList.add("correct")
                            correctAnswer.appendChild(checkIcon)
                        }                        
                    }
                    return Boolean(ev.target.classList.contains("correct"))
                }
            }
            click = dontCheat()
            
        })
        
}



function elaborateQuestion(allCountries, countrySelected, type) {

    // dontCheat = {countrySelected, type}
    
    const possibleAnswers = allCountries.filter( country => {
        if (country.name.common === countrySelected.name.common) return false
            
        return country.subregion === countrySelected.subregion
    })
    

    while (possibleAnswers.length > 3) {
        possibleAnswers.splice( random(0, possibleAnswers.length), 1 )
    }
    console.log(possibleAnswers)
    possibleAnswers.splice( random(0, 3), 0, countrySelected)
    
    // console.log(possibleAnswers)
    
    
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
    const answers = [...clickeableAnswers.children]
    if (answers.some( item => item.classList.contains("correct"))) return false
    
    const correct = click(ev)
    let count = 0;

    if (correct) {
        nextButton.classList.add("show")
        count = correctCount(1)
    } else {
        setTimeout( function() {
            quizbox.style.display = "none"
            resultBox.style.display = "flex"
            resultText.innerHTML = `You got <span class="count">${correctCount(1)}</span> correct answers.`
            correctCount(0)
        }, 2500)
    }
})


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

startQuestion()


