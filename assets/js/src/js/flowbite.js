import 'flowbite/src/flowbite';



// set the modal menu element
const targetEl = document.getElementById('modalEl');

// set the modal toggle btton
const buttonToggle = document.getElementById('modal-close')
/**
 |----------------------------------------
 |  Event Listener
 |----------------------------------------
 */
buttonToggle.addEventListener('click', () => modal.hide())

// options with default values
const options = {
};


/*
* targetEl: required
* options: optional
*/
const modal = new Modal(targetEl, options);
