const trilha = document.querySelector('.trilha');
const linhaProgresso = trilha.querySelector('.linha-progresso');
const links = Array.from(trilha.querySelectorAll('a'));
const sections = links.map(link => document.querySelector(link.getAttribute('href')));

function atualizarProgresso() {
    const viewportHeight = window.innerHeight;
    let activeIndex = 0;

    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportHeight / 3) {
            activeIndex = i;
        }
    });

    links.forEach((link, i) => {
        link.classList.remove('active', 'completed');
        if (i < activeIndex) {
            link.classList.add('completed');
        } else if (i === activeIndex) {
            link.classList.add('active');
        }
    });

    const bullet = links[activeIndex]?.querySelector('.bullet');
    if (bullet) {
        const bulletCenter = bullet.offsetTop + bullet.offsetHeight / 2;
        linhaProgresso.style.height = bulletCenter + 'px';
    }
}

window.addEventListener('scroll', atualizarProgresso);
window.addEventListener('resize', atualizarProgresso);
window.addEventListener('load', atualizarProgresso);

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});