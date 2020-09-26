let controller;
let slideScene;
let pageScene;

function animateSlides() {
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //loop ober each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    // below is unnecessary it doubles line 21
    // gsap.to(revealImg, 1, { x: "100%", opacity: 0.5 });
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%", opacity: 0.5 });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");

    //CREATE new SCENE
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      //reverse: false
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);

    //NEW ANIMATION
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //NEW SCENE
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

animateSlides();

let mouse = document.querySelector(".cursor");
// you declared mouse twice i change the one below to 'mouseTxt'
// let mouse = mouse.querySelector('.span');
// '.span is not a class so you selected it wrong
// let mouseTxt = mouse.querySelector(".span");
let mouseTxt = mouse.querySelector(".cursor-text");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
  const item = e.target;

  if (item.id === "logo" || item.classList.contains("burger")) {
    // ll, item.classList, contains("burger"); { **************************************************
    mouse.classList.add("nav-active");
    // below the 'else' were underlined red so you know something is off there. you should look there.
  } else {
    mouse.classList.remove("nav-active");
  }
  // if (item.classList.add('explore')); { ******************************************************
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    // below you had '{ y: "100%"}'
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gasp.to(".title-swipe", 1, { y: "100%" });
  }
}

// navToggle is incomplete it should look like:
// function navToggle(e) {
//     if (!e.target.classList.contains("active")) {
//       e.target.classList.add("active");
//       gsap.to(".line1", 0.5, { rotate: 45, y: 5, background: "black" });
//       gsap.to(".line2", 0.5, { rotate: -45, y: -5, background: "black" });
//       gsap.to("#logo", { color: "black" });
//       gsap.to(".nav-bar", { clipPath: "circle(3500px at 100% -10%" });
//       document.body.classList.add("hide");
//     } else {
//       e.target.classList.remove("active");
//       gsap.to(".line1", 0.5, { rotate: 0, y: 0, background: "white" });
//       gsap.to(".line2", 0.5, { rotate: 0, y: 0, background: "white" });
//       gsap.to("#logo", { color: "white" });
//       gsap.to(".nav-bar", { clipPath: "circle(20px at 100% -10%" });
//       document.body.classList.remove("hide");
//     }
//   }

function navToggle(e) {
  gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
  gsap.to(".line1", 0.5, { rotate: "-45", y: -5, background: "black" });
  gsap.to(".line1", 0.5, { rotate: "-45", y: -5, background: "black" });
  gsap.to("#logo", 1, { background: "black" });
}
// your syntax is off. i know Ed goes fast in his tutorials so I pause all the time. remember barba is a
// function() that takes in an object {} that has an array [] of stuff that's packed with more objects
// barba({ [{...Code }], [{...more code}], [{...code never stops}], etc }) it's confusing, but definitely
// take the time to learn the concept. it'll make things easier once you jump that hoop.
//Barba Page Transitions
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
      },
      // }
      // before.Leave, () {
      //     slideScene,
      //     destroy();
      //     pageScene,
      //     destroy();
      //     controller,
      //     destroy();
    },

    {
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destory();
      },
    },
    {
      namespace: "fashion",
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
      },
      enter({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
      },
    },
  ],
});

//EventListeners
// do you have burger selected so the event listener can hear it?
const burger = document.querySelector(".burger");
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mousemove", activeCursor);
animateSlides();
