const swiperProduction = new Swiper('.production-slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  navigation: {
    nextEl: '.production-slider-next',
    prevEl: '.production-slider-prev'
  },
  breakpoints: {
    420: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 6,
    }
  },
  spaceBetween: 22,
  speed: 1000
});

const swiperPartners = new Swiper('.partners-slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.partners-slider-next',
    prevEl: '.partners-slider-prev'
  },
  breakpoints: {
    420: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 5,
    }
  },
  spaceBetween: 61,
  speed: 1000
});

ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("yandex-map", {
            center: [54.582105, 39.727724],
            zoom: 13,
            controls: []
        }, {
          suppressMapOpenBlock: true,
          autoFitToViewport: 'always',
          searchControlProvider: 'yandex#search'
        });
    let myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [54.582105, 39.727724]
            },
        }, {
            preset: 'islands#blueFactoryIcon',
            iconColor: '#0095b6'
        });

    myMap.geoObjects.add(myGeoObject);
    document.querySelector('.ymaps-2-1-79-copyright').style.display = 'none';
}

window.addEventListener('scroll', scrollFunction)
function scrollFunction() {
    if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {
        document.querySelector(".myBtn").style.display = "block";
    } else {
        document.querySelector(".myBtn").style.display = "none";
    }
}

document.querySelector(".myBtn").addEventListener('click', topFunction);
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}