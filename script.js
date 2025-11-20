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
const available = document.querySelector(".available");

//
const modalInfo = document.querySelector(".modalInfo");
const infoContainer = document.querySelector(".infoContainer");
const pfpInfo = document.querySelector(".pfpInfo");
const nomInfo = document.querySelector(".nomInfo");
const roleInfo = document.querySelector(".roleInfo");
const mailInfo = document.querySelector(".mailInfo");
const telInfo = document.querySelector(".telInfo");
const arExp = document.querySelector(".arExp");
const modalCard = document.querySelector(".modalCard");

//
const receptionGrid = document.querySelector(".receptionGrid");
const serverGrid = document.querySelector(".serverGrid");
const archiveGrid = document.querySelector(".archiveGrid");
const staffGrid = document.querySelector(".staffGrid");
const conferenceGrid = document.querySelector(".conferenceGrid");
const securityGrid = document.querySelector(".securityGrid");

const staffInfo = JSON.parse(localStorage.getItem("staffInfo")) || [];
//test teception

// popup
addNew.addEventListener("click", () => (modalForm.style.display = "flex"));
modalForm.addEventListener("click", () => (modalForm.style.display = "none"));
form.addEventListener("click", (e) => e.stopPropagation());

modalInfo.addEventListener("click", () => (modalInfo.style.display = "none"));
infoContainer.addEventListener("click", (e) => e.stopPropagation());

//Experience Profesionnel
addExp.addEventListener("click", () => {
  const exWrap = document.createElement("div");
  const exForm = document.createElement("form");
  exWrap.style.display = "flex";
  exForm.innerHTML = `
  <label>Tache:</label>
  <input class="tache" type="text"> 
  <label>Date de commence</label>
  <input class="dateS" type="date"> 
  <label>Date de Finission</label>
  <input class="dateE" type="date">`;
  exForm.className = "exForm";
  const delBtn = document.createElement("button");
  delBtn.innerHTML = `
  <img
    class="delExp w-5 h-5 absolute top-4 right-5"
    src="images/delete.png"
    alt="trash"
  />`;
  exForm.appendChild(delBtn);
  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    exWrap.remove();
  });
  exWrap.appendChild(exForm);

  exp.appendChild(exWrap);
});
//
//just the image thing
photoInput.addEventListener("input", () => {
  pfpImg.src = photoInput.value;
});
if (photoInput.value == "") {
  pfpImg.src = "https://avatar.iran.liara.run/public/17";
}

//**********************
//Ajouter Carte
//**********************
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const experience = Array.from(document.querySelectorAll(".exForm")).map(
    (form) => ({
      tache: form.querySelector(".tache").value,
      dateS: form.querySelector(".dateS").value,
      dateE: form.querySelector(".dateE").value,
    })
  );

  const info = {
    nom: nomInput.value,
    role: roleSelect.value,
    pfp: photoInput.value,
    email: emailInput.value,
    tel: telephoneInput.value,
    exp: experience,
  };
  //test

  //

  let staff = JSON.parse(localStorage.getItem("staffInfo")) || [];
  staff.push(info);
  localStorage.setItem("staffInfo", JSON.stringify(staff));
  //create the card
  const staffCard = createCard(info);
  //append
  cardContainer.appendChild(staffCard);
  const cloneCard = staffCard.cloneNode(true);
  available.appendChild(cloneCard);
  const cardDelete = document.querySelector(".cardDelete");
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
  staffCard.addEventListener("click", () => showInfo(param));
  return staffCard;
}
//showinfo
function showInfo(param) {
  nomInfo.textContent = param.nom;
  roleInfo.textContent = param.role;
  mailInfo.textContent = param.email;
  telInfo.textContent = param.tel;
  pfpInfo.src = param.pfp;

  if (param.exp.length > 0) {
    param.exp.forEach((e) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Tâche:</strong> ${e.tache}</p>
        <p><strong>Début:</strong> ${e.dateS}</p>
        <p><strong>Fin:</strong> ${e.dateE}</p>
        <hr>
      `;
      arExp.appendChild(div);
    });
  } else {
    arExp.innerHTML = "<p>Aucune expérience enregistrée.</p>";
  }

  modalInfo.style.display = "flex";
}
//load
function loadCard() {
  staffInfo.forEach((e) => {
    const staffCard = createCard(e);
    cardContainer.appendChild(staffCard);
    const cloneCard = staffCard.cloneNode(true);
    cloneCard.addEventListener("click", (e) => {
      e.stopPropagation();
      receptionGrid.appendChild(cloneCard);
    });
    //Evenet listener for card
    available.appendChild(cloneCard);
  });
}
//

function assign(room, roleName) {
  modalCard.addEventListener("click", () => (modalCard.style.display = "none"));
  const filterInfo = JSON.parse(localStorage.getItem("staffInfo"));
  localStorage.setItem("filterInfo",JSON.stringify(filterInfo))
  cardContainer.innerHTML = "";
  //
  filterInfo.forEach((info) => {
    if (info.role === roleName || info.role === "Manager") {
      const card = createCard(info);
      cardContainer.appendChild(card);

      //
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        room.appendChild(card);
        modalCard.style.display = "none";
      });
    }
  });
}

receptionGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(receptionGrid, "Réceptionniste");
});

serverGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(serverGrid, "IT");
});

staffGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(staffGrid, "Manager");
});

securityGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(securityGrid, "Sécurité");
});

archiveGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(archiveGrid, "Manager");
});

window.addEventListener("DOMContentLoaded", loadCard);
