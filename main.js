let form = document.querySelector("form");
let dayInput = document.querySelector("#day");
let monthInput = document.querySelector("#month");
let yearInput = document.querySelector("#year");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (dayInput.value.length === 0 || monthInput.value.length === 0 || yearInput.value.length === 0) {
        forValid();
        document.querySelectorAll(".not-valid").forEach((span) => {
            span.textContent = "This field is requied";
        });
    } else {
        let userDate = new Date(`${monthInput.value} ${dayInput.value} ${yearInput.value}`);
        let dateNow = new Date();
        let userBirthdayLastTime = new Date(`${monthInput.value} ${dayInput.value} ${dateNow.getFullYear()}`);
        if ((dateNow - userBirthdayLastTime) < 0) {
            userBirthdayLastTime = new Date(`${monthInput.value} ${dayInput.value} ${dateNow.getFullYear() - 1}`);
            let months = (dateNow.getMonth() + 12) - (userDate.getMonth());
            document.querySelector(".month-value").textContent = dateNow.getDate() < userDate.getDate() ? months - 1 : months;
            document.querySelector(".day-value").textContent = dateNow.getDate();
        } else {
            userBirthdayLastTime = new Date(`${monthInput.value} ${dayInput.value} ${dateNow.getFullYear()}`);
            let months = dateNow.getMonth() - (userBirthdayLastTime.getMonth());
            document.querySelector(".month-value").textContent = dateNow.getDate() < userDate.getDate() ? months - 1 : months;
            if (dateNow.getDate() > userDate.getDate()) {
                document.querySelector(".day-value").textContent = dateNow.getDate() - userDate.getDate();
            } else {
                let previusDate = new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 0).getDate();
                document.querySelector(".day-value").textContent = dateNow.getDate() + (previusDate - userDate.getDate());
            }
        }
        document.querySelector(".year-value").textContent = Math.floor((dateNow - userDate) / 1000 / 60 / 60 / 24 / 365);
    }

    if (dayInput.value > 31) {
        document.querySelector(".day").textContent = "Must be a valid day";
        forValid();
    }
    if (monthInput.value > 12) {
        document.querySelector(".month").textContent = "Must be a valid month";
        forValid();
    }
    if (yearInput.value > 2023) {
        document.querySelector(".year").textContent = "Must be in the past";
        forValid();
    }
});


// Abstraction
function forValid() {
    document.querySelectorAll("input").forEach((input) => {
        input.style.borderColor = "hsl(0, 100%, 67%)";
    });
    document.querySelectorAll("label").forEach((ele) => {
        ele.style.color = "hsl(0, 100%, 67%)";
    });
}
