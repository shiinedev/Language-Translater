
// Wait for the DOM to fully load before executing fetchData
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

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

        // Populate the dropdown menus with the fetched languages
        addToDomLang(lang);
    } catch (error) {
        console.error(error); // Log any errors that occur during fetch
    }
};

// Function to add language options to the dropdown menus
const addToDomLang = (languages) => {

    // Add languages to the "from" dropdown
    for (let lang in languages) {
        const option = document.createElement("option");
        option.textContent = languages[lang].name; // Set the text of the option to the language name
        option.value = lang; //Set the value of the option to the language name
        fromLang.appendChild(option);
        // console.log(lang); 
    }
    // Add languages to the "from" dropdown
    for (let lang in languages) {
        const option = document.createElement("option");
        option.textContent = languages[lang].name; // Set the text of the option to the language name
        option.value = lang; //Set the value of the option to the language name
        ToLang.appendChild(option);
        // console.log(lang); 
    }
   
};

// Event listener for form submission to translate text
document.querySelector("#translate-form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Select the text input and result display elements
    const translateText = document.querySelector("#transale-text");
    const translateResult = document.querySelector("#translate-result");

    // Prepare the translation request URL
    const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${ToLang.value}&from=${fromLang.value}`;
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",// Set content type to JSON
            "x-rapidapi-key": "33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd", // Replace with your RapidAPI key
            "x-rapidapi-host": "microsoft-translator-text-api3.p.rapidapi.com",
      
        },
        body: JSON.stringify([{ text: translateText.value }]), // Body of the request
    };

    try {
        // Send the translation request
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
         // Parse the JSON response

        // Check if the input text is empty and alert the user
        if (translateText.value.trim() === "") {
            alert("Enter text to translate");
        } else {
            // Display the translation result
            result.forEach((el) => {
                translateResult.textContent = el.translations[0].text;
            });
        }
    } catch (error) {
        console.error(error); // Log any errors that occur during the translation
    }
});
