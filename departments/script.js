//fazendo um fetch dos dados passando nossa rota com await

async function getData(){
	const response = await fetch("https://professor-allocation-walkiria.herokuapp.com/departments");
	const json = await response.json();
	return json;
}

async function createData(name) {
	fetch("https://professor-allocation-walkiria.herokuapp.com/departments/", {
    method: "POST",
    body: JSON.stringify({name}),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      console.log("houve um erro");
    }

    response.json().then((json) => {
      createLine(json);
    });
  });
}

async function loadTable(){
	const data = await getData();
	
	for (const item of data){
		createLine(item);
	}
}

async function createLine(dep) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = dep.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");
	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delet";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");
	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.appendChild(linha);
}

loadTable();

function createDepartment() {
	const department = document.getElementById("txtName").value;

	if (!department){
		alert("O nome do departamento é obrigatório!");
	}

	createData(department);
}

const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", createDepartment);

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
	document.getElementById("txtName").value = "";
});

console.log(btnAdd);

