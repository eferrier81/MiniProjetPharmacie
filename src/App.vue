<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <header>
      <img src="./assets/logopharmacie.jpg" alt="Logo Pharmacie" class="logo" />
      <h1>Bienvenue dans la Pharmisis !</h1>
    </header>

    <nav>
      <RouterLink to="/">📋 Liste des Médicaments</RouterLink>
      <RouterLink to="/ajouter">➕ Ajouter un Médicament</RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>

.app-container {
  text-align: center;
  font-family: "Arial", sans-serif;
  background-color: #f4f4f4;
  background-image: url('./assets/background_pharmacie.jpg');
  background-size: cover;
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #2a9d8f;
  padding: 20px;
  color: white;
  font-size: 26px;
  font-weight: bold;
  border-radius: 0 0 10px 10px;
}

.logo {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #264653;
  padding: 10px;
  border-radius: 10px;
  margin: 20px auto;
  width: 60%;
}

nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s;
}

nav a:hover {
  background-color: #e76f51;
}

main {
  padding: 20px;
}
</style>