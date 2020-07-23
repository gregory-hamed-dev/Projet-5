// URL de l'api
const url = "http://localhost:3000/api/teddies";
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const main = document.getElementById("container");
console.log(id)
// Affiche le produit


