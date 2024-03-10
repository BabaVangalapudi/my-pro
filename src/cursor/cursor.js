const cusrsorDot = document.querySelector("[data-cursor-dot]")
const cursorOutline = document.querySelector("[data-cursor-outline]")

window.addEventListener("mousemove", function(e){
    const posX = e.clientX
    const posY = e.clientY
    cusrsorDot.style.left = `${posX}px`
    cusrsorDot.style.top = `${posY}px`

    cursorOutline.animate({
        left : `${posX}px`,
        top:`${posY}px`
    },{duration:500,fill:"forwards"})

})