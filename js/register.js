const formulaire_inscription = document.querySelector('.formulaire_inscription');

const username = document.getElementById('username');

const email = document.getElementById('email');

const password = document.getElementById('password');


formulaire_inscription.addEventListener("submit", async (e) => {

    // empêcher rechargement page
    e.preventDefault();

    
    const donnee = {

        username: username.value,

        email: email.value,

        password: password.value

    };

    console.log("Données :", donnee);

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/register",
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

        if(response.ok){

            alert("Inscription réussie ✔️");

            
            window.location.href = "/index.html";

        } else {

            alert(result.message);

        }

    } catch(error){

        console.log(error);

        alert("Erreur serveur ❌");

    }

});