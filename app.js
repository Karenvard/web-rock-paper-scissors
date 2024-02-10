const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const aiImg = document.querySelector(".ai-choice-main img");
const userImg = document.querySelector(".user-choice-main img");
const userChoiceItem = document.querySelectorAll(".choice-item");
const winText = document.querySelector("winner");
const userScore = document.querySelector(".user-score");
const aiScore = document.querySelector(".ai-score");

let interval = null;
const opt = {
    turnAi: [0],
    turnUser: [0],
    interval: 50,
    userScore: 0,
    aiScore: 0
}

const generateAi = () => {
    let rand = random(1, 3);
    aiImg.setAttribute("src", `./images/${rand}.png`);
}

interval = setInterval(generateAi, opt.interval);

userChoiceItem.forEach(elem => {
    elem.addEventListener("click", () => {
        clearInterval(interval);
        let userChoice = elem.firstElementChild.getAttribute("src");
        userImg.setAttribute("src", userChoice);

        let userNum = parseInt(userChoice.match(/\d/))
        let aiNum = parseInt(aiImg.getAttribute('src').match(/\d/))

        ui();

        opt.turnAi.push(aiNum);
        opt.turnUser.push(userNum);

        checkWinner(opt.turnUser[opt.turnUser.length - 1], opt.turnAi[opt.turnAi.length - 1]);
    })
})


const userButtons = (value) => {
    userChoiceItem.forEach(elem => {
        elem.style.display = value;
    })
}
const ui = () => {
    userButtons("none");
    const userChoiceWrap = document.querySelector(".choice-wrap");
    nextRoundButton = document.createElement("button");
    nextRoundButton.classList.add("next-round-btn");
    nextRoundButton.innerHTML = "Next Round";
    userChoiceWrap.append(nextRoundButton);
}

const checkWinner = (user, ai) => {
    let userScore = document.querySelector(".user-score");
    let aiScore = document.querySelector(".ai-score");
    let winner = document.querySelector(".winner");
    let nextRoundButton = document.querySelector(".next-round-btn");
    
    const checkConditions = () => {
        switch (user) {
            case 1:
                if (ai === 2) {
                    opt.aiScore++;
                } else {
                    opt.userScore++;
                }
                break;
            case 2:
                if (ai === 3) {
                    opt.aiScore++;
                } else {
                    opt.userScore++;
                }
                break;
            case 3:
                if (ai === 1) {
                    opt.aiScore++;
                } else {
                    opt.userScore++;
                }
                break;
        }
    }
    user === ai ? winner.innerHTML = "It`s a TIE!" : checkConditions();
        

    userScore.innerHTML = `User: ${opt.userScore}`;
    aiScore.innerHTML = `AI: ${opt.aiScore}`;

    nextRoundButton.addEventListener("click", () => {
        nextRoundButton.remove();
        userButtons("block");
        document.querySelector(".user-choice-main img").src = "./images/q.png";
        interval = setInterval(generateAi, opt.interval);
        document.querySelector(".winner").innerHTML = "";
    })
}
