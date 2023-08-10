window.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector('#close-btn');
  const connectForm = document.querySelector('#connect-form');

  closeBtn.addEventListener('click', () => {
    console.log(connectForm)
    connectForm.classList.add('hidden');
  })
})