const addNew = document.getElementById("addNew");
const cardContainer = document.querySelector(".cardContainer");
const modalForm = document.querySelector(".modalForm");
const exp = document.querySelector(".exp");
const addExp = document.querySelector(".addExp");
const form = document.getElementById("form");
const nomInput = document.getElementById("nom");
const roleSelect = document.getElementById("role");
const photoInput = document.getElementById("photo");
const pfpImg = document.getElementById("pfp");
const emailInput = document.getElementById("email");
const telephoneInput = document.getElementById("telephone");
const submitBtn = document.getElementById("aj");

// popup
addNew.addEventListener("click", () => (modalForm.style.display = "flex"));
modalForm.addEventListener("click", () => (modalForm.style.display = "none"));
form.addEventListener("click", (e) => e.stopPropagation());

//Experience Profesionnel
addExp.addEventListener("click", () => {
  const exWrap = document.createElement("div");
  const exForm = document.createElement("form");
  exWrap.style.display = "flex";
  exForm.innerHTML = `
<label>Tache:</label>
<input type="textarea"> 
<label>Date de commence</label>
<input type="date"> 
<label>Date de Finission</label>
<input type="date">`;
  exForm.className = "exForm";

  const delBtn = document.createElement("button");
  delBtn.innerHTML = `
  <img
    class="delExp w-5 h-5 absolute top-4 right-5"
    src="images/delete.png"
    alt="trash"
  />;`;

  exForm.appendChild(delBtn);
  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exWrap.remove();
  });

  exWrap.appendChild(exForm);

  exp.appendChild(exWrap);
});

//***********************
//**********************
//Ajouter Carte
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //add to local storage

  const idCard = {
    nom: nomInput.value,
    role: roleSelect.value,
    pfp: photoInput.value,
    email: emailInput.value,
    tel: telephoneInput.value,
  };
  localStorage.setItem("idCard", JSON.stringify(idCard));

  //create the card
  const staffCard = document.createElement("div");
  staffCard.innerHTML = `
          <img
            class="cardPfp aspect-square rounded-full border-2"
            src=""
            alt="pfp"
          />
          <div class="w-2/3">
            <h2 class="text-2xl">Nom Complete</h2>
            <h3>Role</h3>
          </div>
          <div
            class="flex flex-col w-1/12 h-12/12 justify-between items-center"
          >
            <img class="cardDelete" src="images/delete.png" alt="trash" />
            <img src="images/edit.png" class="cardEdit" alt="edit" />
          </div>
`;
  staffCard.className = " staffCard w-11/12 flex justify-between items-center ";
  //append
  cardContainer.appendChild(staffCard);
});

photoInput.addEventListener("input", () => {
  pfpImg.src = photoInput.value;
});
