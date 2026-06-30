const cards = document.querySelector(".cards");

// 📥 Charger les hôtels depuis MongoDB
async function afficherHotels() {

  try {

    const res = await fetch("http://localhost:3000/api/hotels");

    const hotels = await res.json();

    cards.innerHTML = "";

    hotels.forEach((hotel) => {

      cards.innerHTML += `
        <div class="card" onclick="goTodetail('${hotel._id}')">

          <img src="${hotel.image?.url || "/img/default.png"}" alt="hotel" class="hotel-img">

          <div class="card-content">

            <h3>${hotel.nom || "Hôtel sans nom"}</h3>

            <p>
              <i class="fa-solid fa-location-dot"></i>
              ${hotel.adresse || "Adresse inconnue"}
            </p>

            <p>
              <i class="fa-solid fa-phone"></i>
              ${hotel.telephone || "Non disponible"}
            </p>

            <div class="prix">
              ${hotel.prix || 0} ${hotel.devise || "FCFA"}
            </div>

          </div>

        </div>
      `;
    });

    document.querySelector(".bienvenue h2").innerHTML =
      `Hôtels ${hotels.length}`;

  } catch (error) {
    console.error("Erreur affichage hôtels:", error);
  }
}

afficherHotels();
window.afficherHotels = afficherHotels;


// 📷 Preview de la photo sélectionnée
const photoBox = document.getElementById("telecharger-box");
const photoInput = document.getElementById("photo");

function resetPhotoBox() {
  photoBox.innerHTML = `<span>📷</span><p>Ajouter une photo</p>`;
}

photoBox.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", function (e) {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      photoBox.innerHTML = "";
      const img = document.createElement("img");
      img.src = event.target.result;
      img.style.width = "50%";
      photoBox.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});


// ➕ Soumission du formulaire (création d'un hôtel)
document.getElementById("hotelForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!photoInput.files[0]) {
    alert("Veuillez sélectionner une photo");
    return;
  }

  const formData = new FormData();
  formData.append("nom",       document.getElementById("nom").value);
  formData.append("adresse",   document.getElementById("adresse").value);
  formData.append("email",     document.getElementById("email").value);
  formData.append("telephone", document.getElementById("telephone").value);
  formData.append("prix",      document.getElementById("prix").value);
  formData.append("devise",    document.getElementById("devise").value);
  formData.append("image",     photoInput.files[0]);

  try {
    const res = await fetch("http://localhost:3000/api/hotels", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log("OK:", data);

    if (!res.ok) {
      throw new Error(data.message || data.error || "Erreur backend");
    }

    // ✅ Succès : alerte + reset + fermeture popup
    alert("Hôtel créé avec succès !");

    document.getElementById("hotelForm").reset();
    resetPhotoBox();
    afficherHotels();
    togglePopup();

  } catch (error) {
    console.error("ERROR:", error);
    alert("Erreur lors de l'enregistrement");
  }
});