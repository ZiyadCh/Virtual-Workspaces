const reset = document.getElementById("resetBtn");
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
    class="delExp "
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
//image 
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
  let valid = true;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{7,15}$/;

  // Validate inputs
  if (!nameRegex.test(nomInput.value)) {
    alert("Nom invalide !");
    return;
  }
  if (roleSelect.value == "") {
    alert(" Choisir un role !");
    return;
  }
  if (!emailRegex.test(emailInput.value)) {
    alert("Email invalide !");
    return;
  }
  if (!phoneRegex.test(telephoneInput.value)) {
    alert("Téléphone invalide !");
    return;
  }
  if (valid == false) {
    return;
  }

  const experience = Array.from(document.querySelectorAll(".exForm")).map(
    (form, index) => {
      const tache = form.querySelector(".tache").value;
      const dateS = form.querySelector(".dateS").value;
      const dateE = form.querySelector(".dateE").value;

      if (dateS == "" || dateE == "" || tache == "") {
        alert("Remplire tout les champ");
        valid = false;
        return;
      }
      if (new Date(dateS) > new Date(dateE)) {
        alert("la date debut ne peu pas etre apres la dates fin! ");
        valid = false;
        return;
      } else {
        valid = true;
        return {
          tache: tache,
          dateS: dateS,
          dateE: dateE,
        };
      }
    }
  );

  const info = {
    nom: nomInput.value,
    role: roleSelect.value,
    pfp: pfpImg.src,
    email: emailInput.value,
    tel: telephoneInput.value,
    add: addresInput.value,
    exp: experience,
    room: "Unassigend",
    index: staffInfo.length,
  };
  //test

  //

  if (valid == true) {
    staffInfo.push(info);
    localStorage.setItem("staffInfo", JSON.stringify(staffInfo));
    //create the card
    const staffCard = createCard(info);
    //append
    cardContainer.appendChild(staffCard);
  }
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
            class=""
          >
            <img src="images/info.png" class="infoCard" alt="info" />
            <img src="images/remove.png" class="remCard" alt="Remove" />
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
    arExp.innerHTML = "<p>Aucune expérience .</p>";
  }

  modalInfo.style.display = "flex";
}
//load
function loadCard(param) {
  param
    .slice()
    .sort((a, b) => a.index - b.index)
    .forEach((e) => {
      const staffCard = createCard(e);
      cardContainer.appendChild(staffCard);
    });
}
//

//asiggn!!!!
function assign(room, roleName, roomName, max) {
  const card = cardContainer.querySelectorAll(".staffCard");

  reset.addEventListener("click", resetPos);

  function resetPos() {
    cardContainer.innerHTML = "";
    loadCard(staffInfo);
    document.querySelectorAll(
        ".receptionGrid, .serverGrid, .archiveGrid, .staffGrid, .conferenceGrid, .securityGrid"
      )
      .forEach((grid) => (grid.innerHTML = ""));
  }
  function returnCard(e) {
    e.stopPropagation();
    cardContainer.appendChild(this.parentElement.parentElement);
    //couleir

    checkColor();
  }

  //NETTOYAGEFEfef
  document.querySelectorAll(".staffCard").forEach((card) => {
    const i = card.dataset.index;
    const info = staffInfo[i];

    if (
      info.role === roleName ||
      info.role === "Manager" ||
      roleName === "any" ||
      (info.role === "Nettoyage" && roleName !== "Manager")
    ) {
      card.style.opacity = "1";
      card.style.pointerEvents = "auto";
      card.onclick = () => {
        if (room.querySelectorAll(".staffCard").length >= max) {
          alert("!!salle plein!!");
          return;
        }
        info.room = roomName;
        localStorage.setItem("staffInfo", JSON.stringify(staffInfo));
        room.appendChild(card);
        card.querySelector(".remCard").addEventListener("click", returnCard);

        checkColor();
      };
    } else {
      card.style.opacity = "0.5";
      card.style.pointerEvents = "none";
      card.onclick = null;
    }
  });
}
//couleir
function checkColor() {
  //couleir
  if (receptionGrid.children[0] == undefined) {
    receptionGrid.style.background = "#f005";
  } else {
    receptionGrid.style.background = "transparent";
  }
  if (archiveGrid.children[0] == undefined) {
    archiveGrid.style.background = "#f005";
  } else {
    archiveGrid.style.background = "transparent";
  }
  if (securityGrid.children[0] == undefined) {
    securityGrid.style.background = "#f005";
  } else {
    securityGrid.style.background = "transparent";
  }
  if (serverGrid.children[0] == undefined) {
    serverGrid.style.background = "#f005";
  } else {
    serverGrid.style.background = "transparent";
  }
}

checkColor();
receptionGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(receptionGrid, "Réceptionniste", "Salle de Reception", 6);
});

serverGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(serverGrid, "IT", "Salle Des Serveurs", 2);
});

staffGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(staffGrid, "any", "Personel", 5);
});

securityGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(securityGrid, "Sécurité", "Secutiter", 2);
});

archiveGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(archiveGrid, "Manager", "L'archive", 1);
});
conferenceGrid.addEventListener("click", (e) => {
  e.stopPropagation();
  assign(conferenceGrid, "Nettoyage", "Comference", 3);
});

//loadCards at the brigining
window.addEventListener("DOMContentLoaded", () => loadCard(staffInfo));
