document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção de Elementos ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    // --- Alternância de Tema (Claro/Escuro) ---
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Carregar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }

    // --- Menu Responsivo ---
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link (mobile)
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Validação e Simulação de Envio do Formulário ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Limpar mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        let isValid = true;

        // Validação do Nome
        if (nome === '') {
            document.getElementById('error-nome').textContent = 'O nome é obrigatório.';
            isValid = false;
        }

        // Validação do E-mail (Regex simples)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            document.getElementById('error-email').textContent = 'O e-mail é obrigatório.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('error-email').textContent = 'Informe um e-mail válido.';
            isValid = false;
        }

        // Validação da Mensagem
        if (mensagem === '') {
            document.getElementById('error-mensagem').textContent = 'A mensagem não pode estar vazia.';
            isValid = false;
        }

        // Se for válido, simular envio
        if (isValid) {
            // Simulação de processamento
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            setTimeout(() => {
                // Sucesso
                showModal('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
            }, 1500);
        }
    });

    // --- Funções do Modal ---
    function showModal(message) {
        document.getElementById('modal-message').textContent = message;
        modal.style.display = 'block';
    }

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
