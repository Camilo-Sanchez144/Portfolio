
const allHeaders = document.querySelectorAll('.service-header');
const allLists = document.querySelectorAll('.service-card ul');
const allIcons = document.querySelectorAll('.service-header .fa-chevron-up');
const skillsContent = document.querySelectorAll(".skills-content");
const skillsSection = document.querySelector(".skills.section");
const searchInput = document.getElementById("searchProject");
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
const sortSelect = document.getElementById("sortProject");
const counter = document.getElementById("projectCounter");
let isOpen = true; 
let currentFilter = "all";


skillsContent.forEach(skill => {
    const header = skill.querySelector(".skills-header");
    
    header.addEventListener("click", () => {
        skill.classList.toggle("skills-open");
    });
});

function updateCounter(){

    const visibles = [...cards].filter(card =>
        card.style.display !== "none"
    );

    counter.textContent =
        `${visibles.length} proyecto${visibles.length!=1?"s":""} encontrados`;

}

function filterCards(){

    const texto = searchInput.value.toLowerCase();

    cards.forEach(card=>{

        const title = card.dataset.title.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        const coincideTexto =
            title.includes(texto);

        const coincideCategoria =
            currentFilter==="all" ||
            category.includes(currentFilter);

        if(coincideTexto && coincideCategoria){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

    updateCounter();

}

filters.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filters.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        filterCards();

    });

});


searchInput.addEventListener("keyup",filterCards);

sortSelect.addEventListener("change",()=>{

    const grid = document.querySelector(".portfolio-grid");

    const cardsArray = [...cards];

    cardsArray.sort((a,b)=>{

        return a.dataset.title.localeCompare(
            b.dataset.title
        );

    });

    if(sortSelect.value==="desc"){

        cardsArray.reverse();

    }

    cardsArray.forEach(card=>grid.appendChild(card));

});


updateCounter();
const themeSwitch = document.getElementById('miSwiche');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light-theme', themeSwitch.checked);
    localStorage.setItem('theme', themeSwitch.checked ? 'light' : 'dark');
});
const tabBtns = document.querySelectorAll('.tab-btn');
const timelines = document.querySelectorAll('.timeline');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        timelines.forEach(t => {
            t.classList.remove('active');
            if (t.id === target) {
                
                void t.offsetWidth;
                t.classList.add('active');
            }
        });
    });
});
allHeaders.forEach(header => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
    isOpen = !isOpen;
    allLists.forEach(list => list.classList.toggle('collapsed', !isOpen));   
    allIcons.forEach(icon => icon.classList.toggle('rotated', !isOpen));     
});
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const inputs = form.querySelectorAll('input, textarea');
    let hasEmptyField = false;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            hasEmptyField = true;
            input.style.border = '1px solid #ff4444';
        } else {
            input.style.border = 'none';
        }
    });

    if (hasEmptyField) {
        showToast('Por favor, completa todos los campos requeridos');
        return;
    }

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
        .then(response => {
            if (response.ok) {
                alert('Mensaje enviado correctamente.');
                form.reset();
            } else {
                alert('Hubo un error al enviar el mensaje.');
            }
        })
        .catch(() => {
            alert('Hubo un error al enviar el mensaje.');
        });
});

function showToast(message, variant = '') {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = message;
    toast.className = 'toast' + (variant ? ' ' + variant : '');
    void toast.offsetWidth;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}
document.querySelectorAll('.contact-card[data-copy]').forEach(card => {
    card.addEventListener('click', () => {
        const value = card.getAttribute('data-copy');
        const label = card.querySelector('h3').textContent.trim();

        navigator.clipboard.writeText(value)
            .then(() => {
                showToast(`${label} copiado en portapapeles`, 'toast-info');
            })
            .catch(() => {
                showToast('No se pudo copiar', 'toast-info');
            });
    });
});
function setLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    document.querySelectorAll('[data-es-html]').forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}-html`);
    });

    document.querySelectorAll('[data-es-placeholder]').forEach(el => {
        el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });

    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    localStorage.setItem('lang', lang);
}

const langToggle = document.getElementById('langToggle');
const savedLang = localStorage.getItem('lang') || 'es';

setLanguage(savedLang);

langToggle.addEventListener('click', () => {
    const current = document.documentElement.lang;
    setLanguage(current === 'es' ? 'en' : 'es');
});
document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let index = 0;

    function goTo(i) {
        index = (i + dots.length) % dots.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
});

function updateCounter(){
    const visibles = [...cards].filter(card => card.style.display !== "none");
    const lang = document.documentElement.lang;
    const text = lang === 'en'
        ? `${visibles.length} project${visibles.length!=1?"s":""} found`
        : `${visibles.length} proyecto${visibles.length!=1?"s":""} encontrados`;
    counter.textContent = text;
}
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const desc = link.previousElementSibling;
        desc.classList.toggle('collapsed');
        const lang = document.documentElement.lang;
        const isCollapsed = desc.classList.contains('collapsed');
        link.textContent = isCollapsed
            ? (lang === 'en' ? 'Read more' : 'Leer mÃ¡s')
            : (lang === 'en' ? 'Read less' : 'Leer menos');
    });
});
