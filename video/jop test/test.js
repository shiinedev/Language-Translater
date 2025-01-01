
const fetch = async () => {
    const url = 'https://job-listings.p.rapidapi.com/api/job/listing/?url=https%3A%2F%2Fwww.indeed.com%2Fq-data-scientist-l-silicon-valley-jobs.html';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '33928d43a1mshfc0bcb94acfafbdp1081e7jsn9010971be2cd',
            'x-rapidapi-host': 'job-listings.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetch();


