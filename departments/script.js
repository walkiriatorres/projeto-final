//fazendo um fetch dos dados passando nossa rota com await

async function getData(){
	const response = await fetch("https://professor-allocation-walkiria.herokuapp.com/departments");
	const json = await response.json();
	return json;
}
async function loadTable(){
	const data = await getData();
	
	for (const department of data){
		CreateLine(department);
	}
}

async function CreateLine(dep) {
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
