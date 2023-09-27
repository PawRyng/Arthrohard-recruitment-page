const sections = document.querySelectorAll('*[data-type="section"]');
const navs = document.querySelectorAll('.nav__item');
navs.forEach(nav =>{
    nav.addEventListener('click', function(){
        document.getElementById(this.getAttribute('data-name')).scrollIntoView({ 
                behavior: 'smooth'
        });
        navs.forEach(navItem =>{
            navItem.classList.remove('nav__item--active');
        });
        this.classList.add('nav__item--active');
    })
});
let dogIsVisable = false;
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navs.forEach(nav =>{
                nav.classList.remove('nav__item--active');
            });
            document.querySelector(`.nav__item[data-name='${entry.target.getAttribute('data-name')}']`).classList.add('nav__item--active');            
        }
    });
}
function handleIntersectionDog(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            dogIsVisable = true
            
        }
        else{
            dogIsVisable = false
        }
    });
}



    
const observerProducts = new IntersectionObserver(handleIntersectionProducts, {
  root: null, 
  rootMargin: '0px', 
  threshold: 0.5, 
});

const paginationTriggerElement = document.getElementById('products-observer');
observerProducts.observe(paginationTriggerElement);


const modalOpenHandler = function(){
    const {id, name, value} = this.dataset;
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    const idInject = modal.querySelector('*[data-type="inject-id"]');
    const nameInject = modal.querySelector('*[data-type="inject-name"]');
    const valueInject = modal.querySelector('*[data-type="inject-value"]');
    idInject.innerHTML = id
    nameInject.innerHTML = name
    valueInject.innerHTML = value
    body.classList.add("modal-open")
    modal.classList.add("active");
}

document.querySelector('.modal-dialog-header__close').addEventListener('click', ()=>{
    document.querySelector('.modal').classList.remove('active')
    document.querySelector('body').classList.remove("modal-open")
})

//wyswietlanie itemow
let tabProducts = []
const showProduct = item =>{

    const container = document.querySelector('.products-container');
    const templateElement = container.querySelector('.products-container__item--template');
    const observerElement = document.getElementById('products-observer');
    const newItem = templateElement.cloneNode(true);
            newItem.textContent = `ID: ${item.id}`;
            newItem.classList.remove('products-container__item--template');
            newItem.setAttribute('data-id', item.id);
            newItem.setAttribute('data-name', item.name);
            newItem.setAttribute('data-value', item.value);
            newItem.addEventListener('click', modalOpenHandler);
            container.insertBefore(newItem, observerElement);
}

let pageNumber = 1;
let perPageElement = document.querySelector('#products-select').value;
document.querySelector('#products-select').addEventListener('change', function(){
    perPageElement = this.value;
    pageNumber = 1;
})
let isFirst = true;


let firstArray=[];
const dowolandFunction = async () => {
    try {
      const { data } = await fetchPaginationData(perPageElement, pageNumber);
  
      for (const item of data) {
        tabProducts.push(item);
      }
  
      const uniqueArray = [];
      const uniqueIds = new Set();
  
      for (const obj of tabProducts) {
        const objectId = obj.id;
        if (!uniqueIds.has(objectId)) {
          uniqueIds.add(objectId);
          uniqueArray.push(obj);
        }
    }
    for (const item of uniqueArray) {
        if (!firstArray.some((existingItem) => existingItem.id === item.id)) {
            firstArray.push(item);

          showProduct(item);
        }
    }
  
      if (tabProducts.length !== uniqueArray.length) {
        pageNumber++;
        dowolandFunction()
    }
    else{
          pageNumber++;

    }
  
      tabProducts = uniqueArray;

    
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };
async function handleIntersectionProducts(entries, observer) {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
        dowolandFunction();
    }
});
}

async function fetchPaginationData(perPageElement, pageNumber) {
  const apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${perPageElement}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Wystąpił błąd podczas pobierania danych.');
  }

  const data = await response.json();

  return data;
}













// Obserwer
var observerOptions = {
    root: null,
    rootMargin: '0px', 
    threshold: .2 
};
// Obserwer2
var observerOptionsDog = {
    root: null, 
    rootMargin: '0px',
    threshold: 0 
};



var observer = new IntersectionObserver(handleIntersection, observerOptions);
var observer2 = new IntersectionObserver(handleIntersection, observerOptions);
var observer3 = new IntersectionObserver(handleIntersection, observerOptions);
var observerDog = new IntersectionObserver(handleIntersectionDog, observerOptionsDog);

observer.observe(sections[0]);
observer2.observe(sections[1]);
observer3.observe(sections[2]);
observerDog.observe(document.querySelector('.dog'));


const dog = document.querySelector('.dog__dog')
const dotLeft = document.querySelector('.dog__dots--left')
const dotRight = document.querySelector('.dog__dots--right')
const paralaxDog = ()=>{
    if(dogIsVisable){
        let valueDog, valueDotRightY ,valueDotRightX, valueDotLefrtY, valueDotLeftX;
        if(window.innerWidth > 1000){
            valueDog = -1 * ((window.scrollY - 2800) * .2 );
            valueDotRightY = 1 * ((window.scrollY - 3500) * .4 );
            valueDotRightX = -1 * ((window.scrollY - 2500) * .08 );
            valueDotLefrtY = -1 * ((window.scrollY - 2800) * .5 );
            valueDotLeftX = -1 * ((window.scrollY - 4000) * .08 );
        }
        else if(window.innerWidth <= 1000 && window.innerWidth > 767){
            valueDog = -1 * ((window.scrollY - 3800) * .2 );
            valueDotRightY = 1 * ((window.scrollY - 4500) * .4 );
            valueDotRightX = -1 * ((window.scrollY - 5000) * .08 );
            valueDotLefrtY = -1 * ((window.scrollY - 3800) * .5 );
            valueDotLeftX = -1 * ((window.scrollY - 4000) * .08 );
        }
        else if(window.innerWidth <= 767 && window.innerWidth > 480){
            valueDog = -1 * ((window.scrollY - 5500) * .2 );
            valueDotRightY = 1 * ((window.scrollY - 6000) * .4 );
            valueDotRightX = -1 * ((window.scrollY - 6000) * .08 );
            valueDotLefrtY = -1 * ((window.scrollY - 5000) * .5 );
            valueDotLeftX = -1 * ((window.scrollY - 5000) * .08 );
        }
        else if(window.innerWidth <= 480 && window.innerWidth > 380){
            valueDog = -1 * ((window.scrollY - 5500) * .2 );
            valueDotRightY = 1 * ((window.scrollY - 6000) * .4 );
            valueDotRightX = -1 * ((window.scrollY - 6000) * .08 );
            valueDotLefrtY = -1 * ((window.scrollY - 5500) * .5 );
            valueDotLeftX = -1 * ((window.scrollY - 5000) * .08 );
        }
        else{
            valueDog = -1 * ((window.scrollY - 6000) * .2 );
            valueDotRightY = 1 * ((window.scrollY - 6000) * .4 );
            valueDotRightX = -1 * ((window.scrollY - 6000) * .08 );
            valueDotLefrtY = -1 * ((window.scrollY - 6000) * .5 );
            valueDotLeftX = -1 * ((window.scrollY - 6000) * .08 );

        }
        dog.style.bottom = valueDog + 'px';
        dotRight.style.bottom = valueDotRightY + 'px';
        dotRight.style.right = valueDotRightX + 'px';
        dotLeft.style.bottom = valueDotLefrtY + 'px';
        dotLeft.style.left = valueDotLeftX + 'px';
    }
}

window.addEventListener("scroll", paralaxDog)

