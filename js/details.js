const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function afficherDetail(id) {

  if (!id) {
    console.error("Aucun ID fourni dans l'URL");
    return;
  }

  try {

    const res = await fetch(`http://localhost:3000/api/hotels/${id}`);

    if (!res.ok) {
      throw new Error("Hôtel non trouvé");
    }

    const hotel = await res.json();

    console.log(id);
    console.log(hotel);

    if (hotel) {

      document.getElementById("name").textContent = hotel.nom;
      document.getElementById("image").src = hotel.image?.url || "/img/default.png";
      document.getElementById("image").alt = hotel.nom;
      document.getElementById("location").textContent = hotel.adresse;
      document.getElementById("stars").textContent = "5";
      document.getElementById("email").textContent = hotel.email || "Non renseigné";
      document.getElementById("telephone").textContent = hotel.telephone || "Non renseigné";
      document.getElementById("restaurant").textContent = hotel.restaurant || "Non renseigné";
      document.getElementById("devise").textContent = hotel.devise;
      document.getElementById("prix").textContent = Number(hotel.prix).toLocaleString("fr-FR");
      document.getElementById("hotel-id").textContent = `#${hotel._id.slice(-6).toUpperCase()}`;
    }

  } catch (error) {
    console.error("Erreur affichage hôtel:", error);
  }
}

afficherDetail(id);