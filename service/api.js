const baseURL = "https://professor-allocation-walkiria.herokuapp.com";

//GET - retorna uma lista:
async function getData(route) {	
	const response = await fetch(baseURL + route);
	return await response.json();
}
/*NÃO FUI EU QUEM FIZ A PARTE A SEGUIR:*/
// POST - Cria um novo elemento

async function create(route, data) {
  const response = await fetch(baseURL + route, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("houve um erro em create");
    return false;
  }

  return await response.json();
}

// PUT - Atualiza um elemento
async function update(route, data) {
  const response = await fetch(baseURL + route, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("houve um erro em update");
    return false;
  }

  return true;
}

// DELETE - Deleta um elemento
async function deleteData(route) {
  const response = await fetch(baseURL + route, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("houve um erro");
    return false;
  }

  return true;
}
