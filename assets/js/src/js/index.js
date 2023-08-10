window.addEventListener("DOMContentLoaded", () => {
  const menuBtnArrow = document.querySelector('#btn-script-arrow');
  const objetsBtnArrow = document.querySelector('#btn-objets-arrow');
  const modulesBtnArrow = document.querySelector('#btn-modules-arrow');
  const menuBtn = document.querySelector("#btn-script");
  const modulesBtn = document.querySelector("#btn-modules");
  const objetsBtn = document.querySelector("#btn-objets");
  const dropdown = document.querySelector("#dropdown");
  const dropdownObjets = document.querySelector("#dropdown-objets");
  const dropdownModules = document.querySelector("#dropdown-modules");
  const objectOption = document.querySelector("#connection-options");
  const userDropdown = document.querySelector("#user-dropdown");
  const boiteObjet = document.querySelector("#boite-objet");
  const objetPanel = document.querySelector("#objet-panel");
  const canvas = document.querySelector("#canvas");
  const panelBtn = document.querySelector("#panel-btn");
  const upArrow = `<path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />`;
  const downArrow = `<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>`;

  const draggables = document.querySelectorAll("[data-option='draggable'");

  draggables.forEach((draggableElement, index) => {
    draggableElement.id = 'draggable' + (index + 1);
  });

  menuBtn.addEventListener("click", () => {
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      menuBtnArrow.innerHTML = upArrow;
    } else {
      dropdown.classList.add("hidden");
      menuBtnArrow.innerHTML = downArrow;

    }
  });

  modulesBtn.addEventListener("click", () => {
    if (dropdownModules.classList.contains("hidden")) {
      dropdownModules.classList.remove("hidden");
      modulesBtnArrow.innerHTML = upArrow;
    } else {
      dropdownModules.classList.add("hidden");
      modulesBtnArrow.innerHTML = downArrow;

    }
  });

  objetsBtn.addEventListener("click", () => {
    if (dropdownObjets.classList.contains("hidden")) {
      dropdownObjets.classList.remove("hidden");
      objetsBtnArrow.innerHTML = upArrow;
    } else {
      dropdownObjets.classList.add("hidden");
      objetsBtnArrow.innerHTML = downArrow;

    }
  });

  userDropdown.addEventListener('click', () => {
    if (objectOption.classList.contains("hidden")) {
      objectOption.classList.remove("hidden");
    } else {
      objectOption.classList.add("hidden");
    }
  })

  document.addEventListener('click', (event) => {
    if (!dropdown.classList.contains("hidden") && event.target !== menuBtn && event.target !== menuBtn.children[0] && event.target !== menuBtn.children[1]) {
      dropdown.classList.add("hidden");
      menuBtnArrow.innerHTML = downArrow;
    }
    if (!dropdownObjets.classList.contains("hidden") && event.target !== objetsBtn && event.target !== objetsBtn.children[0] && event.target !== menuBtn.children[1]) {
      dropdownObjets.classList.add("hidden");
      objetsBtnArrow.innerHTML = downArrow;
    }
    if (!dropdownModules.classList.contains("hidden") && event.target !== modulesBtn && event.target !== modulesBtn.children[0] && event.target !== menuBtn.children[1]) {
      dropdownModules.classList.add("hidden");
      modulesBtnArrow.innerHTML = downArrow;
    }
  });

  if (boiteObjet) {
    boiteObjet.addEventListener("click", () => {
      if (objetPanel.classList.contains("hidden")) {
        objetPanel.classList.remove("hidden");
        canvas.classList.replace('col-span-10', 'col-span-7')
      } else {
        objetPanel.classList.add("hidden");
        canvas.classList.replace('col-span-7', 'col-span-10')
      }
    });
  }
  if (panelBtn) {
    panelBtn.addEventListener("click", () => {
      objetPanel.classList.add("hidden");
      canvas.classList.replace('col-span-7', 'col-span-10')
    });
  }

});