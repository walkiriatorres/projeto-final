const route = "/courses/";

let actualId = undefined;

const table = document.getElementById("tableBody");

async function createLine(cour) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = cour.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => btnUpdate_click(cour));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(cour));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.appendChild(linha);
}

async function refreshTable() {
	const table = document.getElementById("tableBody");
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	const data = await getData(route);
	
	for (const item of data){
		createLine(item);
	}
}

function btnAdd_click() {
	document.getElementById("txtName").value = "";
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Course";
	actualId = undefined;
}
// evento disparado quando aperta em editar um elemento
function btnUpdate_click(cour) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Course";

	document.getElementById("txtName").value = cour.name;
	actualId = cour.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}
// evento disparado quando aperta em deletar um elemento
function btnDelete_click(cour) {
	actualId = cour.id;	

	const txtDepartment = document.getElementById('txtDeleteCourse');
	txtDepartment.textContent = cour.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}
// evento disparado quando aperta no botão que confirma a criação/atualização do novo elemento
async function applyAddCourse() {
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
async function applyRemoveCourse() {
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
confirmSave.addEventListener("click", applyAddCourse);

// pegando o botao de confirmar a remocao e informando seu evento
const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyRemoveCourse);

// chamando o método de carregar a tabela para exibir na tela
loadTable();


/*




async function createLine(cour) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = cour.name;
	linha.appendChild(colunaNome);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => updateCourse(cour));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => deleteCourse(cour));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.appendChild(linha);
}

loadTable();

function createCourse() {
	const course = document.getElementById("txtName").value;	

	if (!course){
		alert("The course name is required!");
	}

	if (!actualId) {
		createData(course);
	} else {
		updateData(actualId, course);
	}
}

function updateCourse(cour){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Course";

	/* const course = document.getElementById("txtName").value;*/
/*
	document.getElementById("txtName").value = cour.name;
	actualId = cour.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}

function deleteCourse(cour) {
	actualId = cour.id;	

	const txtCourse = document.getElementById('txtDeleteCourse');
	txtCourse.textContent = cour.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}

const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", createCourse);

const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", deleteData);

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
	document.getElementById("txtName").value = "";
	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Course";
	actualId = undefined;
});

console.log(btnAdd);

*/