fetch('https://www.omdbapi.com/?=tt3896198&apikey=7212edd&t=coming+to+america',{
    method: 'GET'})
    .then(res => {
        if (!res.ok){
            console.log("There/'s and issue loading the movie data");
            return;
        }
        return res.json();
    })
    .then(data =>{
        console.log(data.Title, data.Year, data.Released,data.Actors)
        console.log(data.imdbID)
    })
    .catch(error => {
        console.log(error); 
    })