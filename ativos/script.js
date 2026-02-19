document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionamos a seção de Skills e todas as linhas de progresso
    const skillsSection = document.querySelector('#skills');
    const progressLines = document.querySelectorAll('.progress-line');

    // 2. Criamos o "Observador"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se a seção #skills entrou na tela do usuário...
            if (entry.isIntersecting) {
                // Adicionamos a classe 'anima-scroll' em cada barrinha
                progressLines.forEach(line => {
                    line.classList.add('anima-scroll');
                });
                
                // Paramos de observar para a animação não ficar repetindo toda hora
                observer.unobserve(entry.target);
            }
        });
    }, { 
        // 0.5 significa que a animação só dispara quando 50% da seção Skills estiver visível na tela
        threshold: 0.5 
    });

    // 3. Mandamos o observador ficar vigiando a seção Skills
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
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
// Exibir/Ocultar botão de voltar ao topo
const btnTopo = document.querySelector('.btn-topo');

window.addEventListener('scroll', () => {
    // Se a rolagem passar de 1250 pixels, mostra o botão
    if (window.scrollY > 1250) {
        btnTopo.style.display = 'block';
    } else {
        btnTopo.style.display = 'none';
    }
});

// Validação do Formulário de Contato
const formContato = document.querySelector('.contact form');

if(formContato) {
    formContato.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Impede a página de recarregar
        
        // Pega os valores dos campos
        const nome = formContato.querySelector('input[type="text"]').value;
        const email = formContato.querySelector('input[type="email"]').value;
        const mensagem = formContato.querySelector('textarea').value;

        // Verifica se os campos principais estão vazios
        if(nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos obrigatórios para enviar a mensagem!');
            return;
        }

        // Se estiver tudo certo, simula o envio
        alert(`Mensagem enviada com sucesso, ${nome}! Em breve entrarei em contato.`);
        
        // Limpa os campos do formulário
        formContato.reset();
    });
}