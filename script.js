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

  const staffInfo = {
    nom: nomInput.value,
    role: roleSelect.value,
    pfp: photoInput.value,
    email: emailInput.value,
    tel: telephoneInput.value,
  };
  let staff = JSON.parse(localStorage.getItem("staffinfo")) || [];
  staff.push(staffInfo);
  localStorage.setItem("staffinfo", JSON.stringify(staff));

  //create the card
  const staffCard = createCard(staffInfo);
  //append
  cardContainer.appendChild(staffCard);
});

//just the image thing
photoInput.addEventListener("input", () => {
  pfpImg.src = photoInput.value;
});

//create
function createCard(param) {
  const staffCard = document.createElement("div");
  staffCard.innerHTML = `
          <img
            class="cardPfp aspect-square rounded-full border-2 w-20 h-20"
            src="${param.pfp}"
            alt="pfp"
          />
          <div class="w-2/3">
            <h2 class="text-2xl"> ${param.nom} </h2>
            <h3>${param.role}</h3>
          </div>
          <div
            class="flex flex-col w-1/12 h-12/12 justify-between items-center"
          >
            <img class="cardDelete" src="images/delete.png" alt="trash" />
            <img src="images/edit.png" class="cardEdit" alt="edit" />
          </div>
`;
  staffCard.className = " staffCard w-11/12 flex justify-between items-center ";
  return staffCard;
}

function loadCard() {
  const staffInfo = JSON.parse(localStorage.getItem("staffInfo")) || [];
  staffInfo.forEach((e) => {
    const staffCard = createCard(e);
    cardContainer.appendChild(staffCard);
  });
}
