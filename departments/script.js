const route = "/departments/";

let actualId = undefined;

const table = document.getElementById("tableBody");

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

	btnEdit.addEventListener("click", () => btnUpdate_click(dep));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(dep));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.appendChild(linha);
}

async function refreshTable() {	
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	let data = await getData(route);
	
	for (let item of data){
		createLine(item);
	}
}
// evento disparado quando aperta em criar um elemento
function btnAdd_click() {
	document.getElementById("txtName").value = "";
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Department";
	actualId = undefined;
}
// evento disparado quando aperta em editar um elemento
function btnUpdate_click(dep) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Department";

	document.getElementById("txtName").value = dep.name;
	actualId = dep.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}
// evento disparado quando aperta em deletar um elemento
function btnDelete_click(dep) {
	actualId = dep.id;	

	const txtDepartment = document.getElementById('txtDeleteDepartment');
	txtDepartment.textContent = dep.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}
// evento disparado quando aperta no botão que confirma a criação/atualização do novo elemento
async function applyAddDepartament() {
	const name = document.getElementById("txtName").value;

	let result;

	if (!name) {
    alert("O nome é obrigatório!");
    return;
  	}

	if (!actualId && !name) {
	  result = await create(route, { name });
	} else if (!name) {
	  result = await update(route + actualId, { name });
	}

	if (result) {
	  refreshTable();
	}
}
// evento disparado quando aperta no botão que confirma a exclusão do elemento
async function applyRemoveDepartament() {
	const result = await deleteData(route + actualId);

  if (result) {
    refreshTable();
  }

}
//informando o evento do botao de adicionar
const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", btnAdd_click);

//informando o evento pegando do botao de confirmação
const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", applyAddDepartament);

// pegando o botao de confirmar a remocao e informando seu evento
const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyRemoveDepartament);

// chamando o método de carregar a tabela para exibir na tela
loadTable();