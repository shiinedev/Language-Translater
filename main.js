// Select the language dropdown elements from the DOM
const fromLang = document.querySelector("#from-lang");
const ToLang = document.querySelector("#to-lang");

// Wait for the DOM to fully load before executing fetchData
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

// Arrays to hold language names and their short codes
let fullLanguages = [];
let shortLanguages = [];

// Function to fetch available languages from the translation API
const fetchData = async () => {
  const url = "https://microsoft-translator-text-api3.p.rapidapi.com/languages";
    const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd",// Replace with your RapidAPI key
          "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
            
        },
    };

    try {
        // Fetch the language data
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the JSON response
        console.log(result); // Log the result for debugging

        // Extract language names and their short codes
        const lang = result.translation;
        for (let el in lang) {
            shortLanguages.push(el); // Store short language codes
            fullLanguages.push(lang[el].name); // Store full language names
        }

        // Populate the dropdown menus with the fetched languages
        addToDomLang(fullLanguages);
    } catch (error) {
        console.error(error); // Log any errors that occur during fetch
    }
};

// Function to add language options to the dropdown menus
const addToDomLang = (languages) => {
    // Add languages to the "from" dropdown
    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.textContent = lang; // Set the text of the option to the language name
        fromLang.appendChild(option); // Append the option to the dropdown
    });

    // Add languages to the "to" dropdown
    languages.forEach((lang) => {
        const option = document.createElement("option");
        option.textContent = lang; // Set the text of the option to the language name
        ToLang.appendChild(option); // Append the option to the dropdown
    });
};

// Event listener for form submission to translate text
document.querySelector("#translate-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Select the text input and result display elements
    const transaleText = document.querySelector("#transale-text");
    const translateresult = document.querySelector("#translate-result");

    // Get the short language codes for the selected languages
    let ShortTo = shortLanguages[fullLanguages.indexOf(ToLang.value)];
    let shortFrom = shortLanguages[fullLanguages.indexOf(fromLang.value)];

    // Prepare the translation request URL
    const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${ShortTo}&from=${shortFrom}`;
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",// Set content type to JSON
            "x-rapidapi-key": "33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd", // Replace with your RapidAPI key
            "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      
        },
        body: JSON.stringify([{ text: transaleText.value }]), // Body of the request
    };

    try {
        // Send the translation request
        const response = await fetch(url, options);
        const result = await response.json(); // Parse the JSON response

        // Check if the input text is empty and alert the user
        if (transaleText.value.trim() === "") {
            alert("Enter text to translate");
        } else {
            // Display the translation result
            result.forEach((el) => {
                translateresult.textContent = el.translations[0].text;
            });
        }
    } catch (error) {
        console.error(error); // Log any errors that occur during the translation
    }
});
