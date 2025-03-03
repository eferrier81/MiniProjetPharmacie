<script setup>
import { onMounted, reactive, watch, ref } from "vue";
import { getMedicaments, deleteMedicament } from "@/apiService";
import EditMedicament from "@/components/EditMedicament.vue";

const searchQuery = ref("");
const listeMedicaments = reactive([]);
const medicamentSelectionne = ref(null);

function fetchMedicaments() {
  getMedicaments(searchQuery.value)
    .then((data) => {
      listeMedicaments.splice(0, listeMedicaments.length, ...data);
    })
    .catch((error) => console.log(error));
}

watch(searchQuery, fetchMedicaments);
onMounted(fetchMedicaments);

function supprimerMedicament(id) {
  deleteMedicament(id)
    .then(() => fetchMedicaments())
    .catch((error) => console.log(error));
}

function selectionnerMedicament(med) {
  medicamentSelectionne.value = med;
}

function fermerEdition() {
  medicamentSelectionne.value = null;
}
</script>

<template>
  <div class="container">
    <h3>📋 Liste des Médicaments</h3>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un médicament..."
    />

    <div v-if="medicamentSelectionne">
      <EditMedicament
        :medicament="medicamentSelectionne"
        @update="fetchMedicaments"
        @fermer="fermerEdition"
      />
    </div>

    <div v-else>
      <div v-if="listeMedicaments.length > 0" class="medicament-grid">
        <div class="medicament-card" v-for="med in listeMedicaments" :key="med.id">
          <img :src="`https://apipharmacie.pecatte.fr/images/${med.photo}`" alt="Médicament" v-if="med.photo" />
          <div class="info">
            <h4>{{ med.denomination }}</h4>
            <p>{{ med.description }}</p>
          </div>
          <div class="actions">
            <button @click="selectionnerMedicament(med)">✏️ Modifier</button>
            <button class="delete" @click="supprimerMedicament(med.id)">🗑️ Supprimer</button>
          </div>
        </div>
      </div>

      <p v-else>Aucun médicament trouvé.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin: auto;
  font-family: "Poppins", sans-serif;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.medicament-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.medicament-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.medicament-card:hover {
  transform: scale(1.05);
}

img {
  width: auto;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.info h4 {
  margin: 0;
  font-size: 18px;
  color: #264653;
}

.info p {
  margin: 5px 0;
  color: #666;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

button {
  background-color: #2a9d8f;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-size: 14px;
}

button:hover {
  background-color: #21867a;
}

.delete {
  background-color: #e63946;
}

.delete:hover {
  background-color: #d62828;
}
</style>