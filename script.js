const addNew = document.getElementById("addNew");
const modalForm = document.querySelector(".modalForm");
const form = document.getElementById("form");
const exp = document.querySelector(".exp");
const addExp = document.querySelector(".addExp");

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
  delBtn.addEventListener("click", () => {
    exWrap.remove();
  });

  exWrap.appendChild(exForm);

  exp.appendChild(exWrap);
});
