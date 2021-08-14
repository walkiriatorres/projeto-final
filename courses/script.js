let actualId = undefined;
baseURL = "https://professor-allocation-walkiria.herokuapp.com/courses/";

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
     		 alert("houve um erro");
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

