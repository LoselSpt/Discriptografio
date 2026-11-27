const inputTextarea = document.getElementById('input-textarea');
const outputTextarea = document.getElementById('output-textarea');
const encodeBtn = document.getElementById('encode-btn');
const decodeBtn = document.getElementById('decode-btn');
const copyBtn = document.getElementById('copy-btn');
const outputBox = document.querySelector('.output_box');
const toast = document.getElementById('toast');
const soundBtn = document.getElementById('sound-btn');
const bgAudio = document.getElementById('bg-audio');

const transformText = (text) => {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
};

const encodeText = (text) => {
    return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
};

const decodeText = (text) => {
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
};

let toastTimer;
const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
};

const showResult = (text) => {
    outputTextarea.value = text;
    outputBox.classList.add('has-result');
    copyBtn.textContent = 'Copiar';
};

const handleTransform = (transformFn) => {
    const originalText = inputTextarea.value.trim();

    if (!originalText) {
        showToast('Digite um texto antes.');
        inputTextarea.classList.remove('is-shaking');
        void inputTextarea.offsetWidth;
        inputTextarea.classList.add('is-shaking');
        inputTextarea.focus();
        return;
    }

    showResult(transformFn(transformText(originalText)));
};

encodeBtn.addEventListener('click', () => handleTransform(encodeText));
decodeBtn.addEventListener('click', () => handleTransform(decodeText));

copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputTextarea.value);
        copyBtn.textContent = 'Copiado!';
        showToast('Texto copiado para a área de transferência.');
    } catch {
        outputTextarea.select();
        showToast('Não foi possível copiar. Use Ctrl+C.');
    }
});

soundBtn.addEventListener('click', async () => {
    if (bgAudio.paused) {
        try {
            await bgAudio.play();
        } catch {
            showToast('Não foi possível tocar o som.');
            return;
        }
    } else {
        bgAudio.pause();
    }
    const playing = !bgAudio.paused;
    soundBtn.setAttribute('aria-pressed', String(playing));
    soundBtn.setAttribute('aria-label', playing ? 'Desligar som ambiente' : 'Ligar som ambiente');
});
