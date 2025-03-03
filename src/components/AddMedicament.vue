<script setup>
import { reactive } from "vue";
import { addMedicament } from "@/apiService";
import { Medicament } from "@/Medicament.js";

const emit = defineEmits(["medicamentAjoute"]);
const medicamentData = reactive({ denomination: "", formepharmaceutique: "", qte: 1, photo: "" });

function ajouterMedicament() {
    const newMedicament = new Medicament(medicamentData);
    addMedicament(newMedicament)
        .then(() => {
            emit("medicamentAjoute");
            Object.assign(medicamentData, { denomination: "", formepharmaceutique: "", qte: 1, photo: "" });
        })
        .catch((error) => console.log(error));
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (medicamentData.photo = reader.result);
    reader.readAsDataURL(file);
}
</script>

<template>
    <div class="form-container">
        <h3>➕ Ajouter un Médicament</h3>
        <form @submit.prevent="ajouterMedicament">
            <label>Nom :</label>
            <input type="text" v-model="medicamentData.denomination" placeholder="Ex: Doliprane" required />

            <label>Forme :</label>
            <input type="text" v-model="medicamentData.formepharmaceutique" placeholder="Ex: Comprimé" required />

            <label>Quantité :</label>
            <input type="number" v-model="medicamentData.qte" min="1" required />

            <label>Photo :</label>
            <input type="file" @change="handleFileUpload" />

            <button type="submit">✅ Ajouter</button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    width: 60%;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

button {
    background-color: #2a9d8f;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #21867a;
}
</style>