const route = "/professors/"

let departments = [];

let actualId = undefined;

const table = document.getElementById("tableBody");

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

async function refreshTable() {
	table.innerHTML = '';

	loadTable();
}

async function loadTable(){
	let meusDados = await getData(route);
	
	for (let item of meusDados){
		createLine(item);
	}
}

function btnAdd_click() {
	
	document.getElementById("txtName").value = "";
	document.getElementById("txtCPF").value = "";
	document.getElementById("selectDepartmentId").value = "selected";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Professor";
	actualId = undefined;



	

	//validando cpf:
	let value_cpf = document.getElementById('txtCPF');

	value_cpf.addEventListener("blur", function(e) {
	     //Remove tudo o que não é dígito
	     let validar_cpf = this.value.replace( /\D/g , "");

	     //verificação da quantidade números
	     if (validar_cpf.length==11){

	     // verificação de CPF valido
	      var Soma;
	      var Resto;

	      Soma = 0;
	      for (i=1; i<=9; i++) Soma = Soma + parseInt(validar_cpf.substring(i-1, i)) * (11 - i);
	         Resto = (Soma * 10) % 11;

	      if ((Resto == 10) || (Resto == 11))  Resto = 0;
	      if (Resto != parseInt(validar_cpf.substring(9, 10)) ) return alert("CPF Inválido!");;

	      Soma = 0;
	      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(validar_cpf.substring(i-1, i)) * (12 - i);
	      Resto = (Soma * 10) % 11;

	      if ((Resto == 10) || (Resto == 11))  Resto = 0;
	      if (Resto != parseInt(validar_cpf.substring(10, 11) ) ) return alert("CPF Inválido!");;

	      //mascarando cpf
	      cpf_final = validar_cpf.replace( /(\d{3})(\d)/ , "$1.$2");
	      cpf_final = cpf_final.replace( /(\d{3})(\d)/ , "$1.$2");
	      cpf_final = cpf_final.replace(/(\d{3})(\d{1,2})$/ , "$1-$2");
	      document.getElementById('txtCPF').value = cpf_final;

	     } else {
	       alert("CPF Inválido! É esperado 11 dígitos numéricos.")
	     }
	 });

}

function btnUpdate_click(professor){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Professor";

	document.getElementById("txtName").value = professor.name;
	document.getElementById("txtCPF").value = professor.cpf;
	document.getElementById("selectDepartmentId").value = professor.department.id;

	actualId = professor.id;

	//validando cpf:
	let value_cpf = document.getElementById('txtCPF');

	value_cpf.addEventListener("blur", function(e) {
	     //Remove tudo o que não é dígito
	     let validar_cpf = this.value.replace( /\D/g , "");

	     //verificação da quantidade números
	     if (validar_cpf.length==11){

	     // verificação de CPF valido
	      var Soma;
	      var Resto;

	      Soma = 0;
	      for (i=1; i<=9; i++) Soma = Soma + parseInt(validar_cpf.substring(i-1, i)) * (11 - i);
	         Resto = (Soma * 10) % 11;

	      if ((Resto == 10) || (Resto == 11))  Resto = 0;
	      if (Resto != parseInt(validar_cpf.substring(9, 10)) ) return alert("CPF Inválido!");;

	      Soma = 0;
	      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(validar_cpf.substring(i-1, i)) * (12 - i);
	      Resto = (Soma * 10) % 11;

	      if ((Resto == 10) || (Resto == 11))  Resto = 0;
	      if (Resto != parseInt(validar_cpf.substring(10, 11) ) ) return alert("CPF Inválido!");;

	      //formatação final
	      cpf_final = validar_cpf.replace( /(\d{3})(\d)/ , "$1.$2");
	      cpf_final = cpf_final.replace( /(\d{3})(\d)/ , "$1.$2");
	      cpf_final = cpf_final.replace(/(\d{3})(\d{1,2})$/ , "$1-$2");
	      document.getElementById('txtCPF').value = cpf_final;

	     } else {
	       alert("CPF Inválido! É esperado 11 dígitos numéricos.")
	     }   

	 })


	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
	myModal.show();
}

function btnDelete_click(professor) {
	actualId = professor.id;

	const txtProfessor = document.getElementById("txtDeleteProfessor");
	txtProfessor.textContent = professor.name;	

	var myModalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
	myModalDelete.show();

}

async function applyAddProfessor(){
	const name = document.getElementById("txtName").value;
	const cpf = document.getElementById("txtCPF").value;
	const idDepartment = document.getElementById("selectDepartmentId").value;

	
	let result;

	if (!name || !cpf || !idDepartment || idDepartment === "selected") {
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

async function applyDeleteProfessor(){
	const result = await deleteData(route + actualId);

	if (result) {
		refreshTable();
	}
}
const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", btnAdd_click);

const confirmSave = document.getElementById("btnModalCreate");
confirmSave.addEventListener("click", applyAddProfessor);

const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyDeleteProfessor);

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

loadTable();