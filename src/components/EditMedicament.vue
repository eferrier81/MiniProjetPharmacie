<script setup>
import { reactive, watch } from "vue";
import { updateMedicament } from "@/apiService";
import { Medicament } from "@/Medicament.js";

const emit = defineEmits(["update", "fermer"]);
const props = defineProps(["medicament"]);

const editedMedicament = reactive(props.medicament);
editedMedicament.photo = null;

watch(() => props.medicament, (newMed) => {
    Object.assign(editedMedicament, new Medicament(newMed));
});

function modifierMedicament() {
    updateMedicament(editedMedicament)
        .then(() => {
            emit("update");
            emit("fermer"); 
        })
        .catch((error) => console.log(error));
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (editedMedicament.photo = reader.result);
    reader.readAsDataURL(file);
}

</script>

<template>
    <div class="form-container">
        <h3>✏️ Modifier le Médicament</h3>
        <form @submit.prevent="modifierMedicament">
            <label>Nom :</label>
            <input type="text" v-model="editedMedicament.denomination" required />

            <label>Forme :</label>
            <input type="text" v-model="editedMedicament.forme" required />

            <label>Quantité :</label>
            <input type="number" v-model="editedMedicament.quantite" min="0" required />

            <label>Photo :</label>
            <input type="file" @change="handleFileUpload" />

            <div class="actions">
                <button type="submit">✅ Modifier</button>
            </div>
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

.actions {
    display: flex;
    gap: 10px;
    justify-content: center;
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

.cancel {
    background-color: #dc3545;
}

.cancel:hover {
    background-color: #c82333;
}
</style>