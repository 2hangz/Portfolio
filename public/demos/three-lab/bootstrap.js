import('./main.js').catch(error => {
  console.error(error);
  const panel = document.getElementById('loading-panel');
  panel.hidden = false;
  panel.dataset.state = 'error';
  document.getElementById('loading-message').textContent = 'The 3D scene could not start. Check your connection and WebGL support, then retry.';
  const retry = document.getElementById('retry-loading');
  retry.hidden = false;
  retry.addEventListener('click', () => location.reload());
});
