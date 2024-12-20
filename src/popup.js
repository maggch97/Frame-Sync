document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('frameDelay', ({ frameDelay }) => {
        if (frameDelay) {
            document.getElementById('frameDelay').value = frameDelay;
        }
    });
});

onFrameDelayChange = (event) => {
    const frameDelay = event.target.value;
    try {
        const frameDelayNum = parseInt(frameDelay);
        if (isNaN(frameDelayNum)) {
            throw new Error('Invalid frame delay');
        }
        chrome.storage.sync.set({ frameDelay: frameDelayNum });
    } catch {
        chrome.storage.sync.set({ frameDelay: '' });
    }
}

const button = document.getElementById('pauseResumeButton');

button.addEventListener('click', async () => {
    const pauseDelay = (await chrome.storage.sync.get('pauseDelay'))['pauseDelay'];
    const newValue = !pauseDelay;
    await chrome.storage.sync.set({ pauseDelay: newValue });
    refreshPauseResumeButton();
});

const refreshPauseResumeButton = async () => {
    const pauseDelay = (await chrome.storage.sync.get('pauseDelay'))['pauseDelay'];
    const isPaused = pauseDelay;
    button.textContent = isPaused ? 'Resume Delay' : 'Pause Delay';
}

refreshPauseResumeButton();

const frameDelayInput = document.getElementById('frameDelay');
frameDelayInput.addEventListener('input', onFrameDelayChange);