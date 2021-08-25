//caminho do recurso:
const route = "/allocations/"
let departments = [];
let days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY' ];
let hours = ['01:00+0000', '02:00+0000', '03:00+0000', '04:00+0000', '05:00+0000', '06:00+0000', '07:00+0000', '08:00+0000', '09:00+0000', '10:00+0000', '11:00+0000', '12:00+0000', '13:00+0000', '14:00+0000', '15:00+0000', '16:00+0000', '17:00+0000', '18:00+0000', '19:00+0000', '20:00+0000', '21:00+0000', '22:00+0000', '23:00+0000', '00:00+0000'];

//id começando como undefined para efetuar verificação
let actualId = undefined;
//Instanciando a tabela
const table = document.getElementById("tableBody");
//Método que cria uma linha na tabela:
async function createLine(allocation) {
	let linha = document.createElement("tr");

	let colunaProfessor = document.createElement("td");
	colunaProfessor.textContent = allocation.professor.name;
	linha.appendChild(colunaProfessor);

	let colunaDepartment = document.createElement("td");
	colunaDepartment.textContent = allocation.professor.department.name;
	linha.appendChild(colunaDepartment);

	let colunaCourse = document.createElement("td");
	colunaCourse.textContent = allocation.course.name;
	linha.appendChild(colunaCourse);

	let colunaDayOfWeek = document.createElement("td");
	colunaDayOfWeek.textContent = allocation.dayofweek;
	linha.appendChild(colunaDayOfWeek);

	const infoHorario = `${allocation.start} - ${allocation.end}`;
	let colunaHour = document.createElement("td"); 	
	colunaHour.textContent = infoHorario;
	linha.appendChild(colunaHour);


	let colunaEdit = document.createElement("td");
	let btnEdit = document.createElement("button");
	btnEdit.textContent = "Edit";
	btnEdit.classList.add("btn");
	btnEdit.classList.add("btn-info");

	btnEdit.addEventListener("click", () => btnUpdate_click(allocation));

	colunaEdit.appendChild(btnEdit);
	linha.appendChild(colunaEdit);

	let colunaDelete = document.createElement("td");
	let btnDelete = document.createElement("button");
	btnDelete.textContent = "Delete";
	btnDelete.classList.add("btn");
	btnDelete.classList.add("btn-danger");

	btnDelete.addEventListener("click", () => btnDelete_click(allocation));

	colunaDelete.appendChild(btnDelete);
	linha.appendChild(colunaDelete);

	table.appendChild(linha);
}
//Método que recarrega a tabela, ele limpa a tabela e depois a carrega:
async function refreshTable() {
	table.innerHTML = "";

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
	
	document.getElementById("selectProfessorId").value = "selected";
	document.getElementById("selectCourseId").value = "selected";
	document.getElementById("selectDayOfWeekId").value = "selected";
	document.getElementById("selectStartHourId").value = "selected";
	document.getElementById("selectEndHourId").value = "selected";	
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Create Allocation";
	actualId = undefined;
}
//Evento disparado quando aperta em Editar Elemento:
function btnUpdate_click(allocation){
	const title = document.getElementById("modalCreateTitle");
	title.textContent = "Update Allocation";

	document.getElementById("selectProfessorId").value = allocation.professor.id;
	document.getElementById("selectCourseId").value = allocation.course.id;
	document.getElementById("selectDayOfWeekId").value = allocation.dayofweek;
	document.getElementById("selectStartHourId").value = allocation.start;
	document.getElementById("selectEndHourId").value = allocation.end;

	actualId = allocation.id;

	var myModal = new bootstrap.Modal(document.getElementById('modalCreate'));
	myModal.show();
}
//Evento disparado quando aperta em Deletar Elemento:
function btnDelete_click(allocation) {
	actualId = allocation.id;
	
	const txtProfessor = document.getElementById("txtDeleteProfessor");
	txtProfessor.textContent = `${allocation.professor.name} - ${allocation.course.name}`;

	

	var myModalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
	myModalDelete.show();
}
//Evento disparado ao confirmar criação de um novo recurso:
async function applyAddAllocation(){
	const professorId = document.getElementById("selectProfessorId").value;
	const courseId = document.getElementById("selectCourseId").value;
	const dayOfWeek = document.getElementById("selectDayOfWeekId").value;
	const startHour = document.getElementById("selectStartHourId").value;
	const endHour = document.getElementById("selectEndHourId").value;

	let result;

	if (professorId === "selected"
		|| courseId === "selected"
		|| dayOfWeek === "selected"
		|| startHour === "selected"
		|| endHour === "selected") {
		alert("Fill in the required fields teste!");
		return;
	}
	if (startHour == endHour) {
		alert("Não é possível cadastrar aula com horário inicial e final iguais");
		
	}
	if (startHour > endHour) {
		alert("Não foi possível cadastrar aula, horário inicial selecionado foi maior que o horário final.");
		break;
	}

	const data = {
		course: {
			id: courseId
		},
		dayofweek: dayOfWeek,
		end: endHour,
		professor: {
			id: professorId
		},
		start: startHour 

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
async function applyDeleteAllocation(){
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
confirmSave.addEventListener("click", applyAddAllocation);

//Pegando o botão confirmar a remoção e informando o seu evento:
const confirmDelete = document.getElementById("btnModalDelete");
confirmDelete.addEventListener("click", applyDeleteAllocation);

//método que carrega a lista de professores:
async function loadSelectProfessorId() {
	const routeProfessor = "/professors/";
	professors = await getData(routeProfessor);

	const selectProfessors = document.getElementById("selectProfessorId");

	for (let item of professors) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectProfessors.appendChild(opcao);
	}
}

loadSelectProfessorId();

async function loadSelectCourseId() {
	const routeCourse = "/courses/";
	courses = await getData(routeCourse);

	const selectCourses = document.getElementById("selectCourseId");

	for (let item of courses) {
		const opcao = document.createElement("option");
		opcao.value = item.id;
		opcao.textContent = item.name;

		selectCourses.appendChild(opcao);
	}
}

loadSelectCourseId();

async function loadSelectDayHour() {
	
	const selectDayOfWeek = document.getElementById("selectDayOfWeekId");
	const selectStartHour = document.getElementById("selectStartHourId");
	const selectEndHour = document.getElementById("selectEndHourId");

	for (let item of days) {
		const opcao = document.createElement("option");
		opcao.value = item;
		opcao.textContent = item;

		selectDayOfWeek.appendChild(opcao);
	}
	
	for (let item of hours) {
		let optionStart = document.createElement("option");		
		optionStart.value = item;
		optionStart.textContent = item;
		selectStartHour.appendChild(optionStart);

		let optionEnd = document.createElement("option");
		optionEnd.value = item;
		optionEnd.textContent = item;		
		selectEndHour.appendChild(optionEnd);
	}
}


loadSelectDayHour();

//chamando o método de carregar a tabela para exibir na tela
loadTable();
