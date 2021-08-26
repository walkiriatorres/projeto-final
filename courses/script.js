const route = "/courses/"

let actualId = undefined;

const table = document.getElementById("tableBody");
//corrigir
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
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	let data = await getData(route);
	
	for (let item of data){
		createLine(item);
	}
}
function btnAdd_click() {
	document.getElementById("txtName").value = "";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Course";
	actualId = undefined;

	document.getElementById("btnModalCreate").disabled = true;

	//cria um event listener que escuta mudanças no input
	document.getElementById("txtName").addEventListener("input", function(event){

  	//busca conteúdo do input
    var conteudo = document.getElementById("txtName").value;

    //valida conteudo do input 
    if (conteudo !== null && conteudo !== '') {
      //habilita o botão
      document.getElementById("btnModalCreate").disabled = false;
    } else {
      //desabilita o botão se o conteúdo do input ficar em branco
      document.getElementById("btnModalCreate").disabled = true;
    }
});
}
function btnUpdate_click(cour) {
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Course";

	document.getElementById("txtName").value = cour.name;
	actualId = cour.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();

}

function btnDelete_click(cour) {
	actualId = cour.id;	

	const txtCourse = document.getElementById('txtDeleteCourse');
	txtCourse.textContent = cour.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();

} 

async function applyAddProfessor() {
	const name = document.getElementById("txtName").value;

	let result;

	if (!name){
		alert("The course name is required!");
		return;
	}

	if (!actualId) {
		result = await create(route, { name });
	} else {
		result = await update(route + actualId, { name });
	}
	if(result) {
		refreshTable();
	}
}
async function applyDeleteProfessor() {
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

loadTable();
