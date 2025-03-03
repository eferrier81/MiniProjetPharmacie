import { createRouter, createWebHistory } from "vue-router";
import MedsList from "@/components/MedsList.vue";
import AddMedicament from "@/components/AddMedicament.vue";

const routes = [
  { path: "/", component: MedsList },
  { path: "/ajouter", component: AddMedicament },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;