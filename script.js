// simple scroll reveal
const revealElements = document.querySelectorAll('.scroll-reveal');


const revealOnScroll = () => {
for (let elem of revealElements) {
const rect = elem.getBoundingClientRect();
if (rect.top < window.innerHeight - 80) {
elem.classList.add('visible');
}
}
};


window.addEventListener('scroll', revealOnScroll);
revealOnScroll();