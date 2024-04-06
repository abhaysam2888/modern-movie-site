// dark mode function
let hover_display = document.querySelector('#dark_hover')
let ul_display = document.querySelector('#ul_display')
let html = document.querySelector('html')
let dark = document.querySelector('#dark-icon')
let light = document.querySelector('#light-icon')

// add nav dropdown
hover_display.addEventListener('click', () => {
  ul_display.classList.toggle('hidden')
})

// making dark mode by toggle the classlist of html
dark.addEventListener('click', () => {
  html.classList.add('dark')
  ul_display.classList.toggle('hidden')
})
light.addEventListener('click', () => {
  html.classList.remove('dark')
  ul_display.classList.toggle('hidden')
})

// nav bar tilt function
let navbar = document.querySelector('#navbar')

// taking scroll listner and select the scroll top to perform action
function scrollListner() {
  let scrollTop = document.documentElement.scrollTop
  if (scrollTop > 0) {
    navbar.classList.remove('-skew-x-12')
    navbar.classList.add('rounded-lg')
  } else {
    navbar.classList.add('-skew-x-12')
    navbar.classList.remove('rounded-lg')
  }
}

window.addEventListener('scroll', scrollListner)

// nav links search
let popularSearch = document.querySelector('#popular_search')
let topRatedSearch = document.querySelector('#top-rated_search')
let upcomingSearch = document.querySelector('#upcoming_search')

popularSearch.addEventListener('click', () => {
  let url = `https://api.themoviedb.org/3/movie/popular?language=en&api_key=${api_key}`
  fetchSearchApi(url)
})
topRatedSearch.addEventListener('click', () => {
  let url = `https://api.themoviedb.org/3/movie/top_rated?language=en&api_key=${api_key}`
  fetchSearchApi(url)
})
upcomingSearch.addEventListener('click', () => {
  let url = `https://api.themoviedb.org/3/movie/upcoming?language=en&api_key=${api_key}`
  fetchSearchApi(url)
})


// swiper init.
let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // genres array
  let genres_list = {
    "genres": [
      {
        "id": 28,
        "name": "Action",
        "img": "../images/action.jpg"
      },
      {
        "id": 12,
        "name": "Adventure",
        "img": "../images/adventure.jpg"
      },
      {
        "id": 16,
        "name": "Animation",
        "img": "../images/animation.jpg"
      },
      {
        "id": 35,
        "name": "Comedy",
        "img": "../images/comedy.jpg"
      },
      {
        "id": 80,
        "name": "Crime",
        "img": "../images/crime.jpg"
      },
      {
        "id": 99,
        "name": "Documentary",
        "img": "../images/documentary.jpg"
      },
      {
        "id": 18,
        "name": "Drama",
        "img": "../images/drama.jpg"
      },
      {
        "id": 10751,
        "name": "Family",
        "img": "../images/family.jpg"
      },
      {
        "id": 14,
        "name": "Fantasy",
        "img": "../images/fantasy.jpg"
      },
      {
        "id": 36,
        "name": "History",
        "img": "../images/history.webp"
      },
      {
        "id": 27,
        "name": "Horror",
        "img": "../images/horror.jpg"
      },
      {
        "id": 10402,
        "name": "Music",
        "img": "../images/music.jpg"
      },
      {
        "id": 9648,
        "name": "Mystery",
        "img": "../images/mystry.jpg"
      },
      {
        "id": 10749,
        "name": "Romance",
        "img": "../images/romance.jpg"
      },
      {
        "id": 878,
        "name": "Science Fiction",
        "img": "../images/sci. fiction.jpg"
      },
      {
        "id": 10770,
        "name": "TV Movie",
        "img": "../images/tv movie.webp"
      },
      {
        "id": 53,
        "name": "Thriller",
        "img": "../images/thriller.webp"
      },
      {
        "id": 10752,
        "name": "War",
        "img": "../images/war.webp"
      },
      {
        "id": 37,
        "name": "Western",
        "img": "../images/western.webp"
      }
    ]
  }

  // genres card creation
  genres_list.genres.forEach((genres) => {
    // select the template div 
    let container = document.getElementById('genre_parent_cont')
    let template = document.getElementById('genre_template')

    // select the divs of swipper
    let swiper_parent = document.querySelector('#swipper_parent')
    let swipper_temp = document.querySelector('#swiper_temp')
    
    // clone the genre template div
    let cloneTemp = template.content.cloneNode(true)
    // clone the swipper tem div
    let clone_img = swipper_temp.content.cloneNode(true)

    // transfer data in function
   fillData(genres, cloneTemp);
   swipperGenre(genres, clone_img)

    // append the template div in parent div
    container.appendChild(cloneTemp)
    // append the swipper img to parent div
    swiper_parent.appendChild(clone_img)
  })

  // swipper genre img filling function
  function swipperGenre(genres, clone_img) {
    let swiper_img = clone_img.querySelector('#genre_img_slider')
    swiper_img.src = genres.img
  }

  // filling data in components
  function fillData(genres, cloneTemp) {
    // select the element for filling content
    let univerName =  cloneTemp.querySelector('#genre_name')
    univerName.textContent = genres.name
    // set the attribute id in parent div
    let temp_cont = cloneTemp.querySelector('.temp_cont')
    temp_cont.setAttribute('id', genres.id)
    // filling data in images
    let img = cloneTemp.querySelector('#genre_card')
    img.src = genres.img
    // select the parent div to get id for fetching
    searchGenres(temp_cont)  
  }

  // searching through genres
function searchGenres(genreCard) {
  let id = genreCard.getAttribute('id')
  genreCard.addEventListener('click' , () => {
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&with_genres=${id}`
    fetchSearchApi(url)
  })
}

  // fetching api for movie sugestion
  const api_key = 'b1c40673085423ae3ff286d50cd58c2b';

  // making a function to loop the the api and make the cards through search
  let serchValue = document.querySelector('#content-search')
  let searchBtn = document.querySelector('#searchBtn')
  searchBtn.addEventListener('click', () => {
    let query = serchValue.value
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}`
    if (query.length > 0) fetchSearchApi(url); else alert('write something')
  })

  // making the multiple skeleton 
  function skeletonInit() {
    let arr = [1,2,3,4,5,6,7,8,9,10]
    let skeleton = document.querySelector('#card_skeleton')
    arr.forEach(() => {
    let cloneSkeleton = skeleton.content.cloneNode(true)
    let skeleton_parent = document.querySelector('#skeleton_parent')
    skeleton_parent.appendChild(cloneSkeleton)
        })
  }

  // making an call on api through window
  window.addEventListener('load', () => {
    let url = `https://api.themoviedb.org/3/search/movie?query=new movies&api_key=${api_key}`
    fetchSearchApi(url)
  })

  // making a function to fetch api
  function fetchSearchApi(query) {  
    skeletonInit()
        // select the results para
        let no_result = document.querySelector('#no_result')
        
        fetch(query)
        .then(response => {
          // empty the skeleton div on change
          let skeleton_parent = document.querySelector('#skeleton_parent')
          skeleton_parent.innerHTML = ""
          return response.json();
        })
        .then(res => {
          // checking the result is or not
          if (res.results.length == 0) {
            // show the no result
            no_result.classList.remove('hidden')
          } else {
            // hide the result
            no_result.classList.add('hidden')
          }
          return cloneData(res.results)
    })
        .catch(err => console.log(err))
  }



  // making function for clone the divs and fill the clone in parent
  function cloneData(result) {

    // select the parent and temlate div for looping
    let parent_div = document.querySelector('#suggestion_parent')
    let temp_div = document.querySelector('#suggestion_temp')

    parent_div.innerHTML = "";
    // looping the items
    result.forEach((result) => {
      let clone_temp = temp_div.content.cloneNode(true)

      // return the element who not img and text
      if(!result.poster_path) return;
      if(!result.overview) return;

      // tranfer the clone_temp and result for filling the data in component
      resultFilling(clone_temp, result)
      redirect(clone_temp, result)

      // append the clone in parent
      parent_div.appendChild(clone_temp)
    })
  }

  // filling the data in components
  function resultFilling(clone_temp, result) {
    let img = clone_temp.querySelector('#suggestion_img')
    let p = clone_temp.querySelector('#suggestion_p')
    let img_url = `https://image.tmdb.org/t/p/w500${result.poster_path}`
    let rel_date = clone_temp.querySelector('#rel_date')
    img.src = img_url
    p.textContent = result.overview
    rel_date.textContent = result.release_date
  }

  // redirect the page for more information

  function redirect(clone_temp, result) {
    // select the parent of card and add event listner to store the value
    let suggestion_parent = clone_temp.querySelector('#movieCard_temp')

    suggestion_parent.addEventListener('click', () => {
      window.location.href = './card_information.html'
      localStorage.setItem("front_img", result.poster_path);
      localStorage.setItem("back_img", result.backdrop_path);
      localStorage.setItem("lang", result.original_language);
      localStorage.setItem("org_title", result.original_title);
      localStorage.setItem("description", result.overview);
      localStorage.setItem("popularity", result.popularity);
      localStorage.setItem("release_date", result.release_date);
      localStorage.setItem("title", result.title);
      localStorage.setItem("vote_average", result.vote_average);
      localStorage.setItem("vote_count", result.vote_count);
    })
    localStorage.clear();
  }

  