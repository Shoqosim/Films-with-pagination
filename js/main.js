const elInput = document.querySelector('.input_search');
const elFilmsList = document.querySelector('.films_list');
const elPrevBtn = document.querySelector('.films_prev_btn');
const elINextBtn = document.querySelector('.films_next_btn');
const elFilmTemplate = document.querySelector('.film_template').content;



const API_KEY = 'eb022d1f';
let search = 'hulk';
let page = 1;



function renderMovies(arr,node){

    node.innerHTML=null;

    const filmFragment =document.createDocumentFragment();

    arr.forEach(row => {
        
        const clonedFilmTeplate = elFilmTemplate.cloneNode(true);

        clonedFilmTeplate.querySelector('.films_poster').src= row.Poster;
        clonedFilmTeplate.querySelector('.films_title').textContent=row.Title;
        clonedFilmTeplate.querySelector('.morebutton').textContent='MOREINFO';
        clonedFilmTeplate.querySelector('.bookmark').textContent='BOOKMARK';
    
        filmFragment.appendChild(clonedFilmTeplate);
    });

    node.appendChild(filmFragment);

}

async function getMovies (){
    const response = await fetch('https://www.omdbapi.com/?apikey='+ API_KEY + '&s='+ search+'&page='+page,);

    const data = await response.json();

    if(data.Search.length>0){

        renderMovies(data.Search,elFilmsList);
    }

    if(page===1){

        elPrevBtn.disabled = true;
    }
    else{
        elPrevBtn.disabled = false;
    }

    const lastPage = Math.ceil(data.totalResults/10);

    if(page===lastPage){
        elINextBtn.disabled = true;
    }

    else{
        elINextBtn.disabled = false; 
    }
}


elInput.addEventListener('change',(evt)=>{

    search = evt.target.value;
    getMovies()
})

elPrevBtn.addEventListener('click',()=>{

    page--
    getMovies();
})
elINextBtn.addEventListener('click',()=>{

    page++
    getMovies();
})

getMovies();

