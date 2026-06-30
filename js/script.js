const formulaire_connexion = document.querySelector('.formulaire_connexion');

const email = document.getElementById('email');

const password = document.getElementById('password');

const btn_connexion = document.getElementById('btn_connexion');


formulaire_connexion.addEventListener("submit", async (e) => {
// éviter l’actualisation de la page
e.preventDefault();

// récupération des données
const donnee = {

email: email.value,

password: password.value

};

console.log("Les données :", donnee);


try {

const response = await fetch(
"http://localhost:3000/api/auth/login",
{
method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify(donnee)
}
);

const result = await response.json();

console.log(result);


if (response.ok) {

// stockage du token
localStorage.setItem("token", result.token);

alert("Connexion réussie ✔️");

// redirection
window.location.href = "/pages/board.html";

} else {

alert(result.message);

}

} catch (error) {

console.log(error);

alert("Erreur serveur ❌");

}

});