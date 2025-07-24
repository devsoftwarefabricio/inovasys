// Configuração para ativar áudio do vídeo YouTube
let audioActivated = false;
const audioNotice = document.getElementById('audioNotice');
const audioBtn = document.getElementById('audioBtn');
const videoFrame = document.getElementById('videoFrame');

// Função para ativar áudio
function activateAudio() {
    if (!audioActivated) {
        // Substitui o iframe com parâmetro mute=0
        const newSrc = videoFrame.src.replace('mute=1', 'mute=0');
        videoFrame.src = newSrc;
        
        audioActivated = true;
        audioNotice.style.display = 'none';
        audioBtn.innerHTML = '🔊 Som Ativo';
        audioBtn.style.background = 'rgba(0,200,0,0.9)';
        
        setTimeout(() => {
            audioBtn.style.display = 'none';
        }, 2000);
    }
}

// Mostra aviso após 3 segundos
setTimeout(() => {
    if (!audioActivated) {
        audioNotice.style.display = 'block';
    }
}, 3000);

// Event listeners
audioNotice.addEventListener('click', activateAudio);
audioBtn.addEventListener('click', activateAudio);

// Tenta ativar automaticamente após qualquer clique na página
document.addEventListener('click', function() {
    if (!audioActivated) {
        setTimeout(activateAudio, 100);
    }
}, { once: true });

// Animações das seções AIDA
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.aida').forEach((el) => {
    observer.observe(el);
});

// Funcionalidade de zoom para imagens
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Adiciona evento de clique em todas as imagens das seções
document.querySelectorAll('.img-row img').forEach(img => {
    img.addEventListener('click', function() {
        imageModal.style.display = 'block';
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        
        // Impede o scroll do body quando modal estiver aberto
        document.body.style.overflow = 'hidden';
    });
});

// Fecha o modal ao clicar no X
closeModal.addEventListener('click', function() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fecha o modal ao clicar fora da imagem
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fecha o modal com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.style.display === 'block') {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});