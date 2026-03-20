const hero = document.querySelector(".hero");
const bgA = document.querySelector(".hero-bg-a");
const bgB = document.querySelector(".hero-bg-b");

const trigger = document.querySelector("#heroNext .next-content");
const wrap = document.querySelector("#heroNext .next-wrap");

const title = document.getElementById("heroTitle");
const text = document.getElementById("heroText");
const nextTitle = document.getElementById("nextTitle");
const nextImg = document.getElementById("nextImg");


/* ===== SOLO EJECUTA SI EXISTE EL HERO ===== */
if(hero && bgA && bgB && trigger && wrap){

let current = 0;
let animating = false;


/* =====================================================
   SLIDES (🔥 AHORA CON POSICIÓN PERSONALIZADA)
===================================================== */
const slides = [
  {
    img:"assets/img/banner/banner.webp",
    pos:"60% center",
    title:"Tramitamos tu visa <br>de forma rápida y segura",
    text:"Te acompañamos paso a paso con requisitos correctos, preparación profesional y seguimiento real para que avances sin errores ni estrés.",
    label:"Gestionamos tu pasaporte"
  },
  {
    img:"assets/img/banner/banner2.webp",
    pos:"35% center",
    title:"Gestionamos tu pasaporte<br>para que viajes tranquilo",
    text:"Evita filas y errores. Nosotros revisamos y preparamos tu trámite correctamente desde el inicio.",
    label:"Asesoría migratoria"
  },
  {
    img:"assets/img/banner/banner3.webp",
    pos:"center",
    title:"Asesoría experta<br>en trámites migratorios",
    text:"Casos especiales, rechazos o renovaciones. Te guiamos estratégicamente para aumentar tu probabilidad de aprobación.",
    label:"Tramitamos tu visa"
  }
];


/* =====================================================
   PREVIEW
===================================================== */
function updateCurrentPreview(){
  nextTitle.textContent = slides[current].label;
  nextImg.src = slides[current].img;
}


/* =====================================================
   CAMBIO REAL DE SLIDE
===================================================== */
function changeSlide(){

  hero.classList.remove("show-text");

  const next = (current + 1) % slides.length;

  /* imagen siguiente */
  bgB.style.backgroundImage =
    `url(${slides[next].img})`;

  /* 🔥 posición independiente */
  bgB.style.backgroundPosition =
    slides[next].pos || "center";

  hero.classList.add("is-switching");

  setTimeout(()=>{

    bgA.style.backgroundImage =
      bgB.style.backgroundImage;

    bgA.style.backgroundPosition =
      slides[next].pos || "center";

    hero.classList.remove("is-switching");

    title.innerHTML = slides[next].title;
    text.textContent = slides[next].text;

    current = next;
    updateCurrentPreview();

    setTimeout(()=>{
      hero.classList.add("show-text");
      wrap.classList.remove("move");

      animating = false;
      trigger.style.pointerEvents = "auto";
    },20);

  },120);
}


/* =====================================================
   TRANSICIÓN
===================================================== */
function runTransition(){

  if(animating) return;

  animating = true;
  trigger.style.pointerEvents = "none";

  wrap.classList.remove("move");
  void wrap.offsetWidth;
  wrap.classList.add("move");

  setTimeout(changeSlide,420);
}


/* =====================================================
   CLICK
===================================================== */
trigger.addEventListener("click",()=>{
  runTransition();
  restartAuto();
});


/* =====================================================
   AUTO SLIDER
===================================================== */
const AUTO_DELAY = 5000;
let autoTimer=null;

function startAuto(){
  stopAuto();
  autoTimer=setInterval(runTransition,AUTO_DELAY);
}

function stopAuto(){
  if(autoTimer){
    clearInterval(autoTimer);
    autoTimer=null;
  }
}

function restartAuto(){
  startAuto();
}


/* =====================================================
   INIT
===================================================== */
bgA.style.backgroundImage =
  `url(${slides[0].img})`;

bgA.style.backgroundPosition =
  slides[0].pos || "center";

updateCurrentPreview();

setTimeout(()=>{
  hero.classList.add("show-text");
},400);

startAuto();
}

window.addEventListener("load", () => {

  const reviews = document.querySelectorAll(".review");

  if (!reviews || reviews.length < 2) {
    console.log("Slider cancelado");
    return;
  }

  let index = 0;

  reviews.forEach(r=>{
    r.classList.remove("active","exit");
  });

  reviews[0].classList.add("active");

  setInterval(()=>{

    const current = reviews[index];

    current.classList.remove("active");
    current.classList.add("exit");

    index = (index + 1) % reviews.length;

    const next = reviews[index];

    requestAnimationFrame(()=>{
      next.classList.add("active");
    });

    setTimeout(()=>{
      current.classList.remove("exit");
    },800);

  },4000);

});
