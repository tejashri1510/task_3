const tileArray = document.querySelectorAll(".elementTile");
const modalContainer = document.querySelector(".modalContainer");
const closeButton = document.querySelector(".closeButton");
const previousButton = document.querySelector(".previousButton");
const nextButton = document.querySelector(".nextButton");
const modalFactLabel = document.querySelector(".modalFactLabel");
const elementalGroup = document.querySelector(".elementalGroup");
const elementState = document.querySelector(".elementState");
const modalLabels = document.querySelectorAll(".modalLabel");

const modalHeading = document.querySelector(".modalHeading");
const modalElementSymbol = document.querySelector(".modalElementSymbol");
const atomicNumber = document.querySelector(".atomicNumber");
const yearDiscovered = document.querySelector(".yearDiscovered");
const elementFacts = document.querySelector(".elementFacts");
const elementHistory = document.querySelector(".elementHistory");
const url = 'https://periodictable.p.rapidapi.com/';

let selectedTileIndex = null;

for (let i = 0; i < tileArray.length; i++) {
    const tile = tileArray[i];

    const clickedElementNumber = tile.querySelector(".elementNumber").innerText;
    const clickedElementalGroup = tile.getAttribute("title");

    tile.addEventListener("click", () => {

        modalContainer.style.display = "block";
        selectedTileIndex = i;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4677fc9bdamsh8647d31cb2827e8p1956bajsn0357cef6e7ee',
                'X-RapidAPI-Host': 'periodictable.p.rapidapi.com'
            }
        };

        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.text();
                return result;
            } catch (error) {
                console.error(error);
            }
        };

        const allElements = fetchData();

        allElements.then(result => {
            const parsedResult = JSON.parse(result);
            const clickedElement = parsedResult[clickedElementNumber - 1];

            modalElementSymbol.innerText = clickedElement.symbol;
            modalHeading.innerText = clickedElement.name;
            atomicNumber.innerText = clickedElement.atomicNumber;
            elementalGroup.innerText = clickedElementalGroup;
            elementState.innerText = clickedElement.standardState;
            yearDiscovered.innerText = clickedElement.yearDiscovered;


            if (clickedElementalGroup === "Non-Metal") {
                modalElementSymbol.style.borderColor = "rgb(251, 251, 137)";
                modalHeading.style.borderBottomColor = "rgb(251, 251, 137)";
            }
            else if (clickedElementalGroup === "Noble Gas") {
                modalElementSymbol.style.borderColor = "rgb(255, 162, 126)";
                modalHeading.style.borderBottomColor = "rgb(255, 162, 126)";

            }
            else if (clickedElementalGroup === "Alkali Metal") {
                modalElementSymbol.style.borderColor = "rgb(204, 95, 95)";
                modalHeading.style.borderBottomColor = "rgb(204, 95, 95)";
            }
            else if (clickedElementalGroup === "Alkaline Earth Metal") {
                modalElementSymbol.style.borderColor = "rgb(141, 41, 235)";
                modalHeading.style.borderBottomColor = "rgb(141, 41, 235)";
            }
            else if (clickedElementalGroup === "Metalloid") {
                modalElementSymbol.style.borderColor = "rgb(49, 169, 49)";
                modalHeading.style.borderBottomColor = "rgb(49, 169, 49)";
            }
            else if (clickedElementalGroup === "Post Transition Metal") {
                modalElementSymbol.style.borderColor = "rgb(161, 251, 27)";
                modalHeading.style.borderBottomColor = "rgb(161, 251, 27)";
            }
            else if (clickedElementalGroup === "Halogen") {
                modalElementSymbol.style.borderColor = " rgb(218, 255, 54)";
                modalHeading.style.borderBottomColor = " rgb(218, 255, 54)";
            }
            else if (clickedElementalGroup === "Transition Metal") {
                modalElementSymbol.style.borderColor = " rgb(71, 203, 247)";
                modalHeading.style.borderBottomColor = " rgb(71, 203, 247)";
            }
            else if (clickedElementalGroup === "Lanthanide") {
                modalElementSymbol.style.borderColor = " rgb(82, 82, 236)";
                modalHeading.style.borderBottomColor = " rgb(82, 82, 236)";
            }
            else if (clickedElementalGroup === "Actinide") {
                modalElementSymbol.style.borderColor = "rgb(244, 171, 60);";
                modalHeading.style.borderBottomColor = "rgb(244, 171, 60);";
            }

            modalLabels.forEach(label => {
                if (clickedElementalGroup === "Non-Metal") {
                    label.style.color = "rgb(251, 251, 137)";
                } else if (clickedElementalGroup === "Noble Gas") {
                    label.style.color = "rgb(255, 162, 126)";
                } else if (clickedElementalGroup === "Alkali Metal") {
                    label.style.color = "rgb(204, 95, 95)";
                } else if (clickedElementalGroup === "Alkaline Earth Metal") {
                    label.style.color = "rgb(141, 41, 235)";
                } else if (clickedElementalGroup === "Metalloid") {
                    label.style.color = "rgb(49, 169, 49)";
                } else if (clickedElementalGroup === "Post Transition Metal") {
                    label.style.color = "rgb(161, 251, 27)";
                } else if (clickedElementalGroup === "Halogen") {
                    label.style.color = "rgb(218, 255, 54)";
                } else if (clickedElementalGroup === "Transition Metal") {
                    label.style.color = "rgb(71, 203, 247)";
                } else if (clickedElementalGroup === "Lanthanide") {
                    label.style.color = "rgb(82, 82, 236)";
                } else if (clickedElementalGroup === "Actinide") {
                    label.style.color = "rgb(244, 171, 60)";
                }
            });


            if (clickedElement.facts === "") {
                modalFactLabel.style.display = "none";
                elementFacts.innerText = "";
            } else {

                modalFactLabel.style.display = "block"
                elementFacts.innerHTML = `${DOMPurify.sanitize(clickedElement.facts)}`;
            }
            elementHistory.innerHTML = `${DOMPurify.sanitize(clickedElement.history)}`;

        });
    });
}




const handlePreviousButtonClick = () => {
    if (selectedTileIndex !== null) {
        selectedTileIndex--;

        if (selectedTileIndex < 0) {
            selectedTileIndex = tileArray.length - 1;
        }

        const previousTile = tileArray[selectedTileIndex];
        previousTile.click();
    }
};

const handleNextButtonClick = () => {
    if (selectedTileIndex !== null) {

        selectedTileIndex++;
        if (selectedTileIndex >= tileArray.length) {
            selectedTileIndex = 0;
        }

        const nextTile = tileArray[selectedTileIndex];
        nextTile.click();
    }
};

previousButton.addEventListener("click", handlePreviousButtonClick);
nextButton.addEventListener("click", handleNextButtonClick);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        handlePreviousButtonClick();
    }

    if (event.key === "ArrowRight") {
        handleNextButtonClick();
    }
});


//
closeButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
});

