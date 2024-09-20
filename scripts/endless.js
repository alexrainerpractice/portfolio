const container = document.querySelector(".gallery-body");
const original = container.querySelector("section");

const cloned = original.cloneNode(true);
container.appendChild(cloned);

const threshold = 10;

window.scrollTo(0, threshold)

window.addEventListener("scroll", () => {
    const halfHeight = original.clientHeight;

    if(window.scrollY > halfHeight + threshold){
        window.scrollTo(0, window.scrollY - halfHeight);
    } else if(window.scrollY < threshold){
        window.scrollTo(0, halfHeight + window.scrollY);
    }
})