let today = new Date(Date.now())
let end = new Date('April 19, 2022 00:01:00')

setInterval( () => {
        const todayContainer = document.querySelector(".todayContainer")
        const endContainer = document.querySelector(".endContainer")
        const differenceContainer = document.querySelector(".differenceContainer")
        let seconds = Math.abs(end - today) / 1000;
        let days = Math.floor(seconds / 86400);
        seconds -= days * 86400;
        let hours = Math.floor(seconds / 3600) % 24;
        seconds -= hours * 3600;
        let minutes = Math.floor(seconds / 60) % 60;
        seconds -= minutes * 60;
        let second = Math.floor(seconds % 60);
        todayContainer.innerText = "Today is: " + today.toLocaleDateString('sv-SV') + " and the local time is: " + today.toLocaleTimeString('sv-SV')
        endContainer.innerText = "Remember to vote before: " + end.toLocaleDateString('sv-SV') + " at: " + end.toLocaleTimeString('sv-SV')
        differenceContainer.innerText = "You have: " + days + " days, " + hours + " hours, " + minutes + " minutes and " + second + " seconds left to vote"

        today = new Date(Date.now())
  }, 1000)