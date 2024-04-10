const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});
let xo = document.querySelector("#xo");
xo.addEventListener("mouseenter",()=>{
    xo.classList.remove("xo");
xo.classList.add("xo_hover");
})
xo.addEventListener("mouseleave",()=>{
    xo.classList.add("xo");
xo.classList.remove("xo_hover");
})

const logo=document.getElementById("lg");
var toggle=1;
logo.addEventListener("click",()=>{
    if(toggle==1){
        //light to dark
        document.documentElement.style.setProperty("--clr1","#1B0BCE");
        document.documentElement.style.setProperty("--fntclr","#ffffff");
        document.documentElement.style.setProperty("--authbackclr","#ffffff");
        document.documentElement.style.setProperty("--authfontclr","#1B0BCE");
        logo.classList.remove("light");
        toggle=0;
    }
    else{
        //dark to light
        document.documentElement.style.setProperty("--fntclr","#000000");
        document.documentElement.style.setProperty("--clr1","#EAF2FF");
        document.documentElement.style.setProperty("--authbackclr","#1B0BCE");
        document.documentElement.style.setProperty("--authfontclr","#ffffff");
        logo.classList.add("light");
        toggle=1;
    }
})
