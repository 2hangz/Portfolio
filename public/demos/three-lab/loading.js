import * as THREE from 'three';
const panel = document.getElementById('loading-panel');
const message = document.getElementById('loading-message');
const retry = document.getElementById('retry-loading');
const failed = new Set();
const manager = THREE.DefaultLoadingManager;
let hideTimer;
function update(text, state) {
  clearTimeout(hideTimer);
  panel.hidden = false;
  panel.dataset.state = state;
  message.textContent = text;
}
manager.onStart = () => update('Loading scene assets…', 'loading');
manager.onProgress = (_url, loaded, total) => {
  if (!failed.size) update(`Loading scene assets: ${loaded} of ${total}`, 'loading');
};
manager.onError = url => {
  failed.add(url);
  update(`Some assets could not load (${failed.size}). Check your connection and retry.`, 'error');
  retry.hidden = false;
};
manager.onLoad = () => {
  if (failed.size) return;
  update('Scene ready. Drag to orbit; scroll or pinch to zoom.', 'ready');
  hideTimer = setTimeout(() => { panel.hidden = true; }, 4500);
};
retry.addEventListener('click', () => location.reload());
export function trackVideo(video) {
  const url = video.src;
  manager.itemStart(url);
  let finished = false;
  const finish = failed => {
    if (finished) return;
    finished = true;
    if (failed) manager.itemError(url);
    manager.itemEnd(url);
  };
  video.addEventListener('loadeddata', () => finish(false), { once: true });
  video.addEventListener('error', () => finish(true), { once: true });
}
export function playbackHint() {
  update('Press Video Play/Pause to start the video.', 'paused');
}
