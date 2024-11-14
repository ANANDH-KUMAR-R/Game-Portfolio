// //DaekMode :
// let body = document.querySelector("body");
// body.style.transition='.1s';
//  function change() {
//     if(body.style.backgroundColor!="black")
//     {
//         body.style.backgroundColor='black';
//         body.style.color='white';
//     }
//     else{
//          body.style.backgroundColor='white';
//          body.style.color='black';
//     }
//  }

// -------------------------------------------------------------------------------------------------------------------------------
//multiple-Text :
var typed = new Typed(".multiple-Text" ,{
    strings: ["Frontend Developer","Software Developer","UI/UX Developer"],
    typeSpeed : 100,
    backSpeed : 100,
    backDelay : 1000,
    loop : true,
    showCursor:false
})

// -------------------------------------------------------------------------------------------------------------------------------

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function() {headerShadow()};
function headerShadow() {
  const navHeader =document.getElementById("header");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}
