const newMovie ={
    Title: 'Coming to America 2',
    Year: '2021',
    Actors: 'Eddie Murphy, Teyana Taylor, Shari Headley, Wesley Snipes'
}


fetch('https://www.omdbapi.com/?=tt3896198&apikey=7212edd&t=1',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
}).then(res => {
        if (!res.ok){
            console.log("There/'s and issue loading the movie data");
            return;
        }
        return res.json();
    })
    .then(data =>{
        console.log('Success')
        // console.log(data)
    })
    .catch(error => {
        console.log(error); 
    })