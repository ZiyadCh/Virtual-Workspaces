const reset = document.getElementById("resetBtn");
const gGrid = document.getElementsByClassName("gGrid");
const roomTitre = document.getElementsByTagName("h1");
//
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
const addresInput = document.getElementById("addrese");
const submitBtn = document.getElementById("aj");
//
const modalInfo = document.querySelector(".modalInfo");
const infoContainer = document.querySelector(".infoContainer");
const pfpInfo = document.querySelector(".pfpInfo");
const nomInfo = document.querySelector(".nomInfo");
const roleInfo = document.querySelector(".roleInfo");
const mailInfo = document.querySelector(".mailInfo");
const telInfo = document.querySelector(".telInfo");
const arExp = document.querySelector(".arExp");
const adrInfo = document.querySelector(".addresInfo");
const locationInfo = document.querySelector(".locationInfo");

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
  let staff = JSON.parse(localStorage.getItem("staffInfo")) || [];

  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;

  // Validate inputs
  // if (!nameRegex.test(nomInput.value)) {
  //   alert("Nom invalide !");
  //   return;
  // }
  // if (!emailRegex.test(emailInput.value)) {
  //   alert("Email invalide !");
  //   return;
  // }
  // if (!phoneRegex.test(telephoneInput.value)) {
  //   alert("Téléphone invalide !");
  //   return;
  // }

  const experience = Array.from(document.querySelectorAll(".exForm")).map(
    (form) => {
      tache: form.querySelector(".tache").value;
      dateS: form.querySelector(".dateS").value;
      dateE: form.querySelector(".dateE").value;
    },
  );

  //if (dateS && dateE && new Date(dateS) > new Date(dateE)) {
  //  alert(
  //    `La date de début (${dateS}) ne peut pas être après la date de fin (${dateE}) pour la tâche "${tache}".`,
  // );
  // throw new Error("Date validation failed");
  // }

  const info = {
    nom: nomInput.value,
    role: roleSelect.value,
    pfp: photoInput.value,
    email: emailInput.value,
    tel: telephoneInput.value,
    add: addresInput.value,
    exp: experience,
    room: "Unassigend",
  index: staff.length,
  };
  //test

  //

  staff.push(info);
  localStorage.setItem("staffInfo", JSON.stringify(staff));
  //create the card
  const staffCard = createCard(info);
  //append
  cardContainer.appendChild(staffCard);
  const cloneCard = staffCard.cloneNode(true);
});
//create

function createCard(param) {
  const staffCard = document.createElement("div");
staffCard.dataset.index = param.index;
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
            <img src="images/info.png" class="infoCard" alt="info" />
          </div>
`;

  const infoCard = staffCard.querySelector(".infoCard");
  infoCard.addEventListener("click", (e) => {
    e.stopPropagation();
    showInfo(param);
  });
  staffCard.className = " staffCard w-11/12 flex justify-between items-center ";
  return staffCard;
}

//showinfo
function showInfo(param) {
  arExp.innerHTML = "";
  nomInfo.textContent = param.nom;
  roleInfo.textContent = param.role;
  mailInfo.textContent = param.email;
  telInfo.textContent = param.tel;
  adrInfo.textContent = param.add;
  pfpInfo.src = param.pfp;
  locationInfo.textContent = param.room;

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
function loadCard(param) {
  param.slice().sort((a, b) => a.index - b.index).forEach((e) => {
      const staffCard = createCard(e);
      cardContainer.appendChild(staffCard);
    });
}
//

//asiggn!!!!
function assign(room, roleName, roomName) {
  const filterInfo = JSON.parse(localStorage.getItem("staffInfo"));
  localStorage.setItem("filterInfo", JSON.stringify(filterInfo));
  const card = cardContainer.querySelectorAll(".staffCard");

  reset.addEventListener("click", resetPos);

  function resetPos() {
    cardContainer.innerHTML = "";

    loadCard(staffInfo);
    //return
    for (let i = 0; i < gGrid.length; i++) {
      gGrid[i].innerHTML = "";
    }
  }
  function appendCard(e) {
    e.stopPropagation();
    room.appendChild(this);

    room.style.background = "transparent";
    const rem = document.querySelector(".rem");
    this.addEventListener("click", returnCard);
    checkColor();
  }
  function returnCard(e) {
    e.stopPropagation();
    cardContainer.appendChild(this);
    //couleir

    checkColor();
  }

  //NETTOYAGEFEfef
  filterInfo.forEach((info, i) => {

    // if (info.role === "Nettoyage") {
    //   if (room === archiveGrid) {
    //     card[i].style.display = "none";
    //   } else {
    //     card[i].style.display = "flex";
    //     card[i].addEventListener("click", appendCard);
    //   }
    // }
    // autre;
    if (
      info.role === roleName ||
      info.role === "Manager" ||
      roleName === "any"
    ) {
      //
      card[i].style.opacity = "1";
      card[i].addEventListener("click", appendCard);
      info.room = roomName;
      card[i].style.pointerEvents = "auto";

    } else {
      card[i].style.opacity = "0.5";
      card[i].style.pointerEvents = "none";
    }
  });
}
//couleir
function checkColor() {
  //couleir
  if (receptionGrid.children[0] == undefined) {
    receptionGrid.style.background = "#f005";
  }
  if (archiveGrid.children[0] == undefined) {
    archiveGrid.style.background = "#f005";
  }
  if (securityGrid.children[0] == undefined) {
    securityGrid.style.background = "#f005";
  }
  if (serverGrid.children[0] == undefined) {
    serverGrid.style.background = "#f005";
  }
}

checkColor();
receptionGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  if (receptionGrid.querySelectorAll(".staffCard").length >= 4) {
    alert("cette chamebre");
  } else {
    assign(receptionGrid, "Réceptionniste", "Salle de Reception");
  }
});

serverGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(serverGrid, "IT");
});

staffGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(staffGrid, "any");
});

securityGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(securityGrid, "Sécurité");
});

archiveGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(archiveGrid, "Manager");
});
conferenceGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(conferenceGrid, "Nettoyage");
});

//loadCards at the brigining
window.addEventListener("DOMContentLoaded", () => loadCard(staffInfo));
