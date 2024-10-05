 const fromLang = document.querySelector("#from-lang");
 const ToLang = document.querySelector("#to-lang");
const translateresult = document.querySelector("#translate-result");
const transaleText = document.querySelector("#transale-text");

 let languages = [];


 
const fetchData = async () =>{
    const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/languages';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd',
		'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	// console.log(result);
    const lang = result.translation;
    for(let el in lang){
       const option = el;
       languages.push(option);
    //    console.log(option);
       
        
    }
    // console.log(languages);
    addToDomLang(languages);
    

} catch (error) {
	console.error(error);
}
}
 
 
fetchData()

 
const addToDomLang = (languages) =>{
    languages.forEach(lang => {
        const option = document.createElement("option");
        option.textContent = lang;
        fromLang.appendChild(option);
    });
    languages.forEach(lang => {
        const option = document.createElement("option");
        option.textContent = lang;
        ToLang.appendChild(option)
    });
} 

document.querySelector("#translate-form").addEventListener("submit",async (e) =>{
    e.preventDefault();
   
    const url = `https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=${ToLang.value}&from=${fromLang.value}&textType=plain`;
const options = {
	method: 'POST',
	headers: {
        'content-type': 'application/json',
		'x-rapidapi-key': '33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd',
		'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com'
	
	},
	body:JSON.stringify([
		{
			text: transaleText.value
		}
	])
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result)
    if(transaleText.value.trim() === ""){
        alert("enter text to translate")
    }else{
        result.forEach(el =>{
            translateresult.textContent = el.translations[0].text;
            
        })
    }
   
} catch (error) {
	console.error(error);
}
});