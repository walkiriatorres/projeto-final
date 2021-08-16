//fazendo um fetch dos dados passando nossa rota com await
let actualId = undefined;
baseURL = "https://professor-allocation-walkiria.herokuapp.com/departments/";

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
      alert("houve um erro");
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
     		 alert("Error!");
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
      alert("houve um erro");
    }
   
    refreshTable();
  });
}

async function refreshTable() {
	const table = document.getElementById("tableBody");
	table.innerHTML = '';

	loadTable();
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

	btnEdit.addEventListener("click", () => updateDepartment(dep));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => deleteDepartment(dep));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	const table = document.getElementById("tableBody");
	table.appendChild(linha);
}

loadTable();

function createDepartment() {
	const department = document.getElementById("txtName").value;	

	if (!department){
		alert("The department name is required!");
	}

	if (!actualId) {
		createData(department);
	} else {
		updateData(actualId, department);
	}
}

function updateDepartment(dep){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Department";

	/*const department = document.getElementById("txtName").value; */

	document.getElementById("txtName").value = dep.name;
	actualId = dep.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'))
	myModal.show();
}

function deleteDepartment(dep) {
	actualId = dep.id;	

	const txtDepartment = document.getElementById('txtDeleteDepartment');
	txtDepartment.textContent = dep.name;

	var myModal = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModal.show();
}

const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", createDepartment);

const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", deleteData);

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
	document.getElementById("txtName").value = "";
	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Department";

	actualId = undefined;
});

console.log(btnAdd);

