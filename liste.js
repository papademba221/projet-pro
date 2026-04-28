const cards = document.querySelector('.cards');

const hotels = [
  {
    id: 1,
    image: "/img/image.png",
    nom: "Hôtel Terrou-Bi",
    adresse: "Boulevard Martin Luther King, Dakar",
    prix: "25.000"
  },
  {
    id: 2,
    image: "/img/image (1).png",
    nom: "King Fahd Palace",
    adresse: "Rte des Almadies, Dakar",
    prix: "20.000"
  },
  {
    id: 3,
    image: "/img/image (2).png" ,
    nom: "Radisson Blu Hotel",
    adresse: "Rte de la Commiche O,Dakar 16868",
    prix: "22.000"
  },
  {
    id: 4,
    image: "/img/image (3).png",
    nom: "Pullman Dakar terranga",
    adresse: "Place de l'independance,10 Rue PL 29,Dakar",
    prix: "30.000"
  },
  {
    id: 5,
    image:"/img/image (4).png",
    nom: "Hôtel lace Rose",
    adresse: "lace Rose , Dakar",
    prix: "25.000 "
  },
  {
    id: 6,
    image: "/img/image (5).png",
    nom: "Hôtel Saly",
    adresse: "Mbour,Sénégal",
    prix: "20.000"
  },
  {
    id: 7,
    image: "/img/image (6).png",
    nom: "Palm Beash Resort & spa",
    adresse: "BP65,Saly 23000",
    prix: "22.000"
  },
  {
    id: 8,
    image: "/img/image (7).png",
    nom: "Pullman Dakar terranga",
    adresse: "Place de l'independance,10 Rue PL 29,Dakar",
    prix: "30.000"
  },

];


function afficherHotels() {
  cards.innerHTML = "";

  hotels.forEach((hotel) => {

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.nom}">
      <div class="texte">
        <p>${hotel.adresse}</p>
        <h3>${hotel.nom}</h3>
        <h5>${hotel.prix} XOF par nuit</h5>
      </div>
    `;

    card.onclick = () => goTodetail(hotel.id);

    cards.appendChild(card);
  });
}

afficherHotels();