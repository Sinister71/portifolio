
document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. ELEMENTOS DO HTML
    // =========================================

    const menuIcon = document.querySelector('.icone-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    const btnTopo = document.querySelector('.btn-topo');
    const formContato = document.querySelector('.contact form');

    // =========================================
    // 2. MENU DE NAVEGAÇÃO
    // =========================================

    function alternarMenu() {
        if (!menuIcon || !navbar) return;

        const menuAberto = navbar.classList.toggle('active');

        menuIcon.classList.toggle('fa-bars', !menuAberto);
        menuIcon.classList.toggle('fa-xmark', menuAberto);
    }

    function fecharMenu() {
        if (!menuIcon || !navbar) return;

        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
    }

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', alternarMenu);
    }

    // Fecha o menu após selecionar uma seção
    navLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    // =========================================
    // 3. IDENTIFICAÇÃO DA SEÇÃO ATIVA
    // =========================================

    function atualizarLinkAtivo() {
        const alturaHeader =
        document.querySelector('.header')?.offsetHeight || 0;

    // Linha de referência logo abaixo do cabeçalho.
    const linhaAtivacao = Math.max(
    alturaHeader + 10,
    window.innerHeight * 0.25
    );

    let secaoAtual = sections[0];

    sections.forEach(secao => {
        const limiteSuperior = secao.getBoundingClientRect().top;

        if (limiteSuperior <= linhaAtivacao) {
            secaoAtual = secao;
        }
    });

    // No final da página, força a ativação da última seção.
    const chegouAoFinal =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

    if (chegouAoFinal) {
        secaoAtual = sections[sections.length - 1];
    }

    if (!secaoAtual) return;

    navLinks.forEach(link => link.classList.remove('active'));

    const linkAtivo = document.querySelector(
        `header nav a[href="#${secaoAtual.id}"]`
    );

    if (linkAtivo) {
        linkAtivo.classList.add('active');
    }
}

    // =========================================
    // 4. BOTÃO VOLTAR AO TOPO
    // =========================================

    function atualizarBotaoTopo() {
        if (!btnTopo) return;

        btnTopo.style.display =
            window.scrollY > 1250 ? 'block' : 'none';
    }

    // =========================================
    // 5. EVENTO DE ROLAGEM
    // =========================================

    function atualizarElementosNaRolagem() {
        atualizarLinkAtivo();
        atualizarBotaoTopo();
    }

    window.addEventListener(
        'scroll',
        atualizarElementosNaRolagem,
        { passive: true }
    );

    // Atualiza o estado inicial ao carregar a página
    atualizarElementosNaRolagem();

    // =========================================
    // 6. FORMULÁRIO DE CONTATO
    // =========================================

    if (formContato) {
        formContato.addEventListener('submit', evento => {
            evento.preventDefault();

            const nome = formContato.querySelector(
                'input[type="text"]'
            )?.value.trim();

            const email = formContato.querySelector(
                'input[type="email"]'
            )?.value.trim();

            const mensagem = formContato.querySelector(
                'textarea'
            )?.value.trim();

            // Verifica os campos principais
            if (!nome || !email || !mensagem) {
                alert(
                    'Por favor, preencha nome, e-mail e mensagem.'
                );
                return;
            }

            // O envio real será configurado posteriormente
            alert(
                'Os campos foram validados, mas o formulário ainda não está conectado a um serviço de envio. Nenhuma mensagem foi enviada.'
            );
        });
    }

    // Animação de entrada dos grupos de competências
    const gruposCompetencias = document.querySelectorAll(
        '.skills .skill-group'
    );

    if (gruposCompetencias.length > 0) {
        // Ativa os estilos de animação somente quando há grupos
        document.documentElement.classList.add('js');

        // Verifica o suporte ao IntersectionObserver
        if ('IntersectionObserver' in window) {

            const observerSkills = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {

                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');

                            // Para de observar após a entrada
                            observer.unobserve(entry.target);
                        }

                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: '0px 0px -40px 0px'
                }
            );

            // Observa individualmente os três grupos
            gruposCompetencias.forEach(grupo => {
                observerSkills.observe(grupo);
            });

        } else {
            // Fallback para navegadores sem suporte
            gruposCompetencias.forEach(grupo => {
                grupo.classList.add('is-visible');
            });
        }
    }
});