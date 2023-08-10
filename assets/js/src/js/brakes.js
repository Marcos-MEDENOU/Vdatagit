document.addEventListener('DOMContentLoaded', () => {
  const updateBrakes = document.querySelectorAll('[data-type="update-brake"]');

  updateBrakes.forEach(updateBtn => {
    updateBtn.addEventListener('click', e => {
      const brakeid = e.target.getAttribute('data-id');
      const form = 'form' + brakeid;
      document.getElementById(form).submit();
    });
  });
});