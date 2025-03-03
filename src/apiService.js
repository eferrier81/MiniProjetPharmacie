import { Medicament } from "./Medicament.js";

const API_URL = "https://apipharmacie.pecatte.fr/api/";
const ID_PHARMACIE = "13";

export async function getMedicaments(search = "") {
  const fetchOptions = { method: "GET" };
  try {
    const response = await fetch(
      `${API_URL}${ID_PHARMACIE}/medicaments${search ? `?search=${search}` : ""}`,
      fetchOptions
    );
    const dataJSON = await response.json();
    return dataJSON.map((item) => new Medicament(item));
  } catch (error) {
    return console.log(error);
  }
}

export async function addMedicament(medicament) {
  const fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      denomination: medicament.denomination,
      formepharmaceutique: medicament.forme,
      qte: medicament.quantite,
      photo: medicament.photo,
    }),
  };

  try {
    const response = await fetch(`${API_URL}${ID_PHARMACIE}/medicaments`, fetchOptions);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

export async function updateMedicament(medicament) {
  const fetchOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: medicament.id,
      denomination: medicament.denomination,
      formepharmaceutique: medicament.forme,
      qte: medicament.quantite,
      photo: medicament.photo,
    }),
  };

  try {
    const response = await fetch(`${API_URL}${ID_PHARMACIE}/medicaments`, fetchOptions);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteMedicament(id) {
  const fetchOptions = { method: "DELETE" };

  try {
    const response = await fetch(`${API_URL}${ID_PHARMACIE}/medicaments/${id}`, fetchOptions);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
