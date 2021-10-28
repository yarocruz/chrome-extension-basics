let page = document.getElementById("buttonDiv");
let selectClassName = "current";
const presetButtonColors = ["#3aa321", "#e8453c", "#f9bb2d", "#4888f1"];

function handleButtonClick(event) {
    let current = event.target.parentElement.querySelector(`${selectClassName}`);

    if (current && current !== event.target) {
        current.classList.remove(selectClassName)
    }

    // mark as selected
    let color = event.target.dataset.color;
    event.target.classList.add(selectClassName);
    chrome.storage.sync.set( {color });
}

function constructOptions(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        let currentColor = data.color

        for (let buttonColor of buttonColors) {
            // create a button with that color
            let button = document.createElement("button");
            button.dataset.color = buttonColor;
            button.style.backgroundColor = buttonColor

            if (buttonColor === currentColor) {
                button.classList.add(selectClassName)
            }

            button.addEventListener("click", handleButtonClick);

            page.appendChild(button)
        }
    })
}

// Initialize page with color option buttons
constructOptions(presetButtonColors)