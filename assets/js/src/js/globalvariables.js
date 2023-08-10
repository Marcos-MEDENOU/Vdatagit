window.addEventListener('DOMContentLoaded', () => {
  let addRowButton = document.querySelector('#add-row-button') ?? null
  let gvarForm = document.getElementById('g_var_form')
  let modalEl = document.getElementById('modalEl')
  let modalClose = document.getElementById('modal-close');

  gvarForm.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('[data-type="add-row"]')) {
      e.preventDefault();
      let closestRow = target.closest('[data-type="gvar_row"]')
      let newRow = document.createElement('div');
      newRow.setAttribute('data-type', 'gvar_row')
      newRow.setAttribute('data-row', '')
      newRow.classList.add('grid', 'grid-cols-12', 'border-0')
      newRow.innerHTML = `
      <div class="col-span-3 py-1">
        <input class="pl-2 w-full" name="Nomvar[]" type="text" spellcheck="false" value="" required >
        </div >
        <div class="col-span-3  w-full py-1 pl-2">
          <select name="var_type[]" id="" class="w-full">
            <option value="text">Text</option>
            <option value="number">Numérique</option>
            <option value="boolean">Booléen</option>
            <option value="random">Aléatoire</option>
            <option value="guid">Guid</option>
            <option value="connected">Connecté à une colonne table</option>
          </select>
        </div>
        <div class="col-span-5  text-gray-500 py-1 pl-2 ">
          <input class="pl-2 w-full" name="description[]" type="text" value="Texte" spellcheck="false">
        </div>
        <div data-type="action" class="col-span-1  flex justify-center items-center gap-4 py-1">
          <button data-action="add-row" class="rounded-full hover:ring-1 hover:ring-offset-1 hover:ring-green-700">
            <svg data-type="add-row" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path data-type="add-row" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button data-action="remove-row" class="rounded-full hover:ring-1 hover:ring-offset-1 hover:ring-red-700">
            <svg data-type="remove-row" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path data-type="remove-row" stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      <div>
      `;
      closestRow.after(newRow)
    }

    if (target.matches('[data-type="remove-row"]')) {
      e.preventDefault();
      let closestRow = target.closest('div[data-type="gvar_row"]');
      if (confirm('Etes-vous sûr de vouloir supprimer cet élément ?')) {
        closestRow.remove();
        if (!document.querySelector('[data-type="gvar_row"]')) {
          createAddButton();
        }
      }
    }

    if (target.id === 'add-row-button') {
      target.classList.add('hidden');
      let newRow = createRow();
      gvarForm.append(newRow);
    }
  })

  modalClose?.addEventListener('click', () => {
    modalEl.classList.add('hidden');
  });

  addRowButton?.addEventListener('click', (e) => {
    e.preventDefault()
  })

  function checkIfAddButtonExists() {
    if (addRowButton) return true;
    return false;
  }

  function createAddButton() {

    let newAddButton = document.createElement('button');
    newAddButton.classList.add('px-4', 'py-2', 'border', 'bg-green-500', 'hover:bg-green-600', 'text-white', 'text-2xl')
    newAddButton.innerHTML = 'Ajouter une variable'
    newAddButton.setAttribute('id', 'add-row-button');
    gvarForm.append(newAddButton);
  }

  function createRow() {
    let newRow = document.createElement('div');
    newRow.setAttribute('data-type', 'gvar_row')
    newRow.setAttribute('data-row', '')
    newRow.classList.add('grid', 'grid-cols-12', 'border-0')
    newRow.innerHTML = `<div class="col-span-3 py-1">
        <input class="pl-2 w-full" name="Nomvar[]" type="text" spellcheck="false" value="" required >
        </div >
        <div class="col-span-3  w-full py-1 pl-2">
          <select name="var_type[]" id="" class="w-full">
            <option value="text">Text</option>
            <option value="number">Numérique</option>
            <option value="boolean">Booléen</option>
            <option value="random">Aléatoire</option>
            <option value="guid">Guid</option>
            <option value="connected">Connecté à une colonne table</option>
          </select>
        </div>
        <div class="col-span-5  text-gray-500 py-1 pl-2 ">
          <input class="pl-2 w-full" name="description[]" type="text" value="Texte" spellcheck="false">
        </div>
        <div data-type="action" class="col-span-1  flex justify-center items-center gap-4 py-1">
          <button data-action="add-row" class="rounded-full hover:ring-1 hover:ring-offset-1 hover:ring-green-700">
            <svg data-type="add-row" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path data-type="add-row" stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button data-action="remove-row" class="rounded-full hover:ring-1 hover:ring-offset-1 hover:ring-red-700">
            <svg data-type="remove-row" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path data-type="remove-row" stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      `;
    return newRow;
  }

  function appendRow() {
    addRowButton?.remove()
    let newRow = createRow();
    gvarForm.appendChild(newRow);
  }

})