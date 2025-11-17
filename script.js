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
  exWrap.style.display = "flex";

  const inEx = document.createElement("input");

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.style.background = "transparent";
  delBtn.style.border = "none";

  delBtn.addEventListener("click", () => {
    exWrap.remove();
  });

  exWrap.appendChild(delBtn);
  exWrap.appendChild(inEx);

  exp.appendChild(exWrap);
});

