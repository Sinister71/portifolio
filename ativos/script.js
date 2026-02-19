// Seleciona o ícone pelo nome da classe que você usou no HTML
let menuIcon = document.querySelector('.icone-menu');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
// Ajustado: O seu menu não usa <ul> nem <li>, apenas <nav> e <a>
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                
                // Ajustado: O seletor foi corrigido e as aspas em 'active' foram adicionadas
                let currentLink = document.querySelector('header nav a[href*=' + id + ']');
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            });
        }
    });
};

menuIcon.onclick = () => {
    // Ajustado para FontAwesome: alterna entre o ícone de hambúrguer e o "X"
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark'); 
    
    // Mostra/oculta o menu mobile
    navbar.classList.toggle('active');
};