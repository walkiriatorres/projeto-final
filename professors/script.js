//caminho do recurso:
const route = "/professors/"
let departments = [];

//id começando como undefined para efetuar verificação
let actualId = undefined;
//Instanciando a tabela
const table = document.getElementById("tableBody");
//Método que cria uma linha na tabela:
async function createLine(professor) {
	let linha = document.createElement("tr");

	let colunaNome = document.createElement("td");
	colunaNome.textContent = professor.name;
	linha.appendChild(colunaNome);

	let colunaCPF = document.createElement("td");
	colunaCPF.textContent = professor.cpf;
	linha.appendChild(colunaCPF);

	let colunaDepartment = document.createElement("td");
	colunaDepartment.textContent = professor.department.name;
	linha.appendChild(colunaDepartment);

	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => btnUpdate_click(professor));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(professor));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	table.appendChild(linha);
}
//Método que recarrega a tabela, ele limpa a tabela e depois a carrega:
async function refreshTable() {
	table.innerHTML = '';

	loadTable();
}
//Método que carrega a tabela:
async function loadTable(){
	let meusDados = await getData(route);
	
	for (let item of meusDados){
		createLine(item);
	}
}
//Evento disparado quando aperta em Adicionar novo Elemento:
function btnAdd_click() {
	
	document.getElementById("txtName").value = "";
	document.getElementById("txtCPF").value = "";
	document.getElementById("selectDepartmentId").value = "selected";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Professor";
	actualId = undefined;
}
//Evento disparado quando aperta em Editar Elemento:
function btnUpdate_click(professor){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Professor";

	document.getElementById("txtName").value = professor.name;
	document.getElementById("txtCPF").value = professor.cpf;
	document.getElementById("selectDepartmentId").value = professor.department.id;

	actualId = professor.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}
//Evento disparado quando aperta em Deletar Elemento:
function btnDelete_click(professor) {
	const txtProfessor = document.getElementById("txtDeleteProfessor");
	txtProfessor.textContent = professor.name;

	actualId = professor.id;

	var myModalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
	myModalDelete.show();
}
//Evento disparado ao confirmar criação de um novo recurso:
async function applyAddProfessor(){
	const name = document.getElementById("txtName").value;
	const cpf = document.getElementById("txtCPF").value;
	const idDepartment = document.getElementById("selectDepartmentId").value;

	//Selecionando um departamento
	let result;

	if (!name || !cpf || !idDepartment || idDepartment === ""){
		alert("Fill in the required fields!");
		return;
	}

	const data = {
		name,
		cpf,
		department: {
			id: idDepartment
		}
	}

	if (!actualId) {
		result = await create(route, data);
	} else {
		result = await update(route + actualId, data);
	}
	if(result) {
		refreshTable();
	}
}
//Evento disparado ao confirmar remoção de um novo recurso:
async function applyDeleteProfessor(){
	const result = await deleteData(route + actualId);

	if (result) {
		refreshTable();
	}
}
//Pegando o botão adicionar e informando o seu evento:
const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", btnAdd_click);

//Pegando o botão confirmar a adição e informando o seu evento:
const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", applyAddProfessor);

//Pegando o botão confirmar a remoção e informando o seu evento:
const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyDeleteProfessor);

//método que carrega a lista de departmantos:
async function loadSelectDepartmentId() {
	const routeDepartment = "/departments/";
	departaments = await getData(routeDepartment);

	const selectDepartments = document.getElementById("selectDepartmentId");

	for (let item of departaments) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectDepartments.appendChild(opcao);
	}
}

loadSelectDepartmentId();

//chamando o método de carregar a tabela para exibir na tela
loadTable();


/*
async function getData(route) {	
	const response = await fetch(baseURL + route);
	return await response.json();
}
/*
/*
baseURL = "https://professor-allocation-walkiria.herokuapp.com";
*/
/*

baseURL = "https://professor-allocation-walkiria.herokuapp.com/professors/";


async function getData(){
	const response = await fetch(baseURL);
	const json = await response.json();
	return json;
}

async function createData(name) {
	fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({name}),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      console.log("Error!");
    }

    response.json().then((json) => {
     createLine(json);
    });
  });
}

async function updateData(id, name) {
	fetch(baseURL + id, {
	    method: "PUT",
	    body: JSON.stringify({ name: name }),
	    headers: { "Content-Type": "application/json" },
  	}).then((response) => {
   		if (!response.ok) {
     		 console.log("Error!");
    	}

   		response.json().then((json) => {
   		 refreshTable();     		
    	});
 	});
}

async function deleteData() {
	fetch(baseURL + actualId, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      console.log("houve um erro");
    }
   
    refreshTable();
  });
}
*/