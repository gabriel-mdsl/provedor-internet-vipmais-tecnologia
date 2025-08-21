// Variáveis globais
let slideIndex = 0;
let slideInterval;
let deviceCount = 4;
let chatbotOpen = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    startSlideShow();
    updateRecommendedPlan();
});

// Funções do Menu Mobile
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}

// Fechar menu ao clicar fora
document.addEventListener('click', function (event) {
    const menu = document.getElementById('menu');
    const menuToggle = document.querySelector('.menu-toggle');
    const navegacao = document.querySelector('.navegacao');

    if (!navegacao.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Funções do Banner
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % 2;
    updateSlide();
}

function prevSlide() {
    slideIndex = slideIndex === 0 ? 1 : 0;
    updateSlide();
}

function currentSlide(n) {
    slideIndex = n - 1;
    updateSlide();
}

function updateSlide() {
    const slides = document.querySelector('.banner-slides');
    const dots = document.querySelectorAll('.banner-dot');

    slides.style.transform = `translateX(-${slideIndex * 50}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Pausar slideshow ao hover
document.querySelector('.banner').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

document.querySelector('.banner').addEventListener('mouseleave', () => {
    startSlideShow();
});

// Calculadora de Planos
function changeDeviceCount(change) {
    deviceCount = Math.max(1, Math.min(50, deviceCount + change));
    document.getElementById('deviceCount').textContent = deviceCount;
    updateRecommendedPlan();
}

function updateRecommendedPlan() {
    const recommendedPlan = document.getElementById('recommendedPlan');
    let planName, planDescription;

    if (deviceCount <= 3) {
        planName = 'Bronze 300MB';
        planDescription = 'Ideal para uso básico e poucos dispositivos!';
    } else if (deviceCount <= 8) {
        planName = 'Ouro 500MB';
        planDescription = 'Perfeito para sua família navegar sem travamentos!';
    } else if (deviceCount <= 15) {
        planName = 'Diamante 600MB';
        planDescription = 'Ótimo para casas com muitos dispositivos conectados!';
    } else if (deviceCount <= 25) {
        planName = 'Premium 900MB';
        planDescription = 'Para quem precisa de alta velocidade e estabilidade!';
    } else {
        planName = 'Gamer IP Fixo 1GB';
        planDescription = 'O máximo em velocidade para uso profissional!';
    }

    recommendedPlan.innerHTML = `
                <h4>💡 Recomendamos o plano <strong>${planName}</strong></h4>
                <p>${planDescription}</p>
            `;
}

// Seleção de Plano
function selecionarPlano(plano, preco) {
    document.getElementById('plano').value = `${plano} - ${preco}`;

    // Destacar o campo do plano por 5 segundos
    const planoGroup = document.getElementById('plano').closest('.form-group');
    planoGroup.classList.add('highlight');

    // Remover o destaque após 5 segundos
    setTimeout(() => {
        planoGroup.classList.remove('highlight');
    }, 5000);

    document.getElementById('contratar').scrollIntoView({ behavior: 'smooth' });
}

// FAQ
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');

    // Fechar todas as outras FAQs
    document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });

    // Abrir/fechar a FAQ clicada
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Chatbot
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotOpen = !chatbotOpen;

    if (chatbotOpen) {
        chatbotWindow.classList.add('active');
    } else {
        chatbotWindow.classList.remove('active');
    }
}

function chatbotResponse(type) {
    const messages = document.getElementById('chatbotMessages');
    let response = '';

    switch (type) {
        case 'planos':
            response = 'Temos 5 planos disponíveis: Bronze (300MB - R$ 99,99), Ouro (500MB - R$ 109,99), Diamante (600MB - R$ 149,99), Premium (900MB - R$ 199,99) e Gamer IP Fixo (1GB - R$ 399,99). Qual te interessa mais?';
            break;
        case 'velocidade':
            response = 'Para uso básico (1-3 dispositivos): Bronze 300MB. Para famílias (4-8 dispositivos): Ouro 500MB. Para uso intenso (9+ dispositivos): Diamante ou Premium. Para gamers e empresas: Gamer IP Fixo 1GB.';
            break;
        case 'instalacao':
            response = 'A instalação é rápida! Após a contratação, fazemos análise técnica e instalamos em até 48h. O processo leva 2-3 horas e é totalmente gratuito.';
            break;
        case 'suporte':
            response = 'Nosso suporte funciona 24/7! Você pode nos contatar pelo WhatsApp (98) 8753-7010 ou telefone. Estamos sempre prontos para ajudar!';
            break;
    }

    // Adicionar mensagem do usuário
    const userMessage = document.createElement('div');
    userMessage.className = 'chatbot-message user';
    userMessage.textContent = type === 'planos' ? 'Ver planos disponíveis' :
        type === 'velocidade' ? 'Qual velocidade preciso?' :
            type === 'instalacao' ? 'Como funciona a instalação?' : 'Falar com suporte';
    messages.appendChild(userMessage);

    // Adicionar resposta do bot
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.textContent = response;
        messages.appendChild(botMessage);
        messages.scrollTop = messages.scrollHeight;
    }, 1000);

    messages.scrollTop = messages.scrollHeight;
}

// WhatsApp
function openWhatsApp() {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os planos de internet da Vipmais Tecnologia.');
    window.open(`https://wa.me/559887537010?text=${message}`, '_blank');
}

function enviarWhatsApp() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const plano = document.getElementById('plano').value;
    const endereco = document.getElementById('endereco').value;
    const observacoes = document.getElementById('observacoes').value;

    if (!nome || !cpf || !telefone || !plano || !endereco) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const data = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        email: email,
        plano: plano,
        endereco: endereco,
        observacoes: observacoes
    };

    enviarWhatsAppComDados(data);
}

function enviarWhatsAppComDados(data) {
    let message = `*🌐 Solicitação de Contratação - Vipmais Tecnologia*\n\n`;
    if (data.idContrato) message += `🔢 *ID do Contrato:* ${data.idContrato}\n`;
    message += `📝 *Nome:* ${data.nome}\n`;
    message += `🆔 *CPF:* ${data.cpf}\n`;
    message += `📱 *Telefone:* ${data.telefone}\n`;
    if (data.email) message += `📧 *E-mail:* ${data.email}\n`;
    message += `💎 *Plano Escolhido:* ${data.plano}\n`;
    if (data.precoPlano) message += `💰 *Valor:* R$ ${data.precoPlano}/mês\n`;
    message += `🏠 *Endereço:* ${data.endereco}\n`;
    if (data.observacoes) message += `📋 *Observações:* ${data.observacoes}\n`;
    message += `\n✅ Gostaria de contratar este plano. Aguardo contato para finalizar!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/559887537010?text=${encodedMessage}`;

    console.log('Abrindo WhatsApp:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
}

// Função para gerar ID único
function gerarIdContrato() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `VIP${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
}

// Função para extrair preço do plano
function extrairPrecoPlano(planoCompleto) {
    const match = planoCompleto.match(/R\$\s*([\d,]+\.?\d*)/);
    return match ? match[1] : 'N/A';
}

// Configuração do Google Sheets
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1X6VQjrS32EQHe40stk3iKO4HoAhy5_gkbCNR83Vk2WVzCoFTAeTY1QJLoVOhIbNG/exec';

// Função para enviar dados para Google Sheets
async function enviarParaGoogleSheets(data) {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.idContrato,
                timestamp: data.timestamp,
                nome_cliente: data.nome,
                telefone: data.telefone,
                cpf: data.cpf,
                endereco: data.endereco,
                plano_contratado: data.plano,
                preco_plano: data.precoPlano,
                email: data.email || '',
                observacoes: data.observacoes || '',
                status: data.status
            })
        });

        return { success: true };
    } catch (error) {
        console.error('Erro ao enviar para Google Sheets:', error);
        return { success: false, error: error.message };
    }
}

// Formulário
document.getElementById('formularioContrato').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.btn-enviar');
    const originalText = submitBtn.innerHTML;

    // Mostrar loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Adicionar dados extras
    data.timestamp = new Date().toLocaleString('pt-BR');
    data.status = 'Novo';
    data.idContrato = gerarIdContrato();
    data.precoPlano = extrairPrecoPlano(data.plano);
    data.fonte = 'Site Vipmais';

    try {
        // Enviar para Google Sheets
        const result = await enviarParaGoogleSheets(data);

        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        if (result.success) {
            // Mostrar mensagem de sucesso
            document.getElementById('mensagemSucesso').style.display = 'block';
            this.style.display = 'none';

            // Perguntar sobre WhatsApp após 2 segundos
            setTimeout(() => {
                if (confirm('✅ Dados salvos com sucesso!\n\n📱 Deseja enviar via WhatsApp para finalizar o atendimento?')) {
                    enviarWhatsAppComDados(data);
                }
            }, 2000);
        } else {
            // Em caso de erro, ainda oferece WhatsApp
            alert('⚠️ Houve um problema ao salvar os dados, mas você ainda pode enviar via WhatsApp!');
            if (confirm('📱 Deseja enviar via WhatsApp?')) {
                enviarWhatsAppComDados(data);
            }
        }

    } catch (error) {
        // Restaurar botão em caso de erro
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        console.error('Erro no envio:', error);
        alert('⚠️ Erro ao processar solicitação. Tente enviar via WhatsApp!');

        if (confirm('📱 Deseja enviar via WhatsApp?')) {
            enviarWhatsAppComDados(data);
        }
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = value;
});

// Máscara para CPF
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    } else if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }
    e.target.value = value;
});