
let appartements = [

    // ================= COTONOU =================
    {
        ville: "cotonou",
        nom: "Luxe Océan",
        description: "2 chambres • Vue mer • Piscine",
        prix: "60 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
    },
    {
        ville: "cotonou",
        nom: "Studio Centre-ville",
        description: "1 chambre • Climatisation • WiFi",
        prix: "35 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    {
        ville: "cotonou",
        nom: "Résidence Côtière",
        description: "3 chambres • Terrasse • Parking",
        prix: "75 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    },

    // ================= PORTO-NOVO =================
    {
        ville: "porto-novo",
        nom: "Villa Royale",
        description: "3 chambres • Luxe • Jardin",
        prix: "55 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    {
        ville: "porto-novo",
        nom: "Appartement Moderne",
        description: "2 chambres • WiFi • Cuisine équipée",
        prix: "40 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
    },
    {
        ville: "porto-novo",
        nom: "Résidence Centre",
        description: "1 chambre • Simple • Propre",
        prix: "25 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },

    // ================= PARAKOU =================
    {
        ville: "parakou",
        nom: "Nord Confort",
        description: "2 chambres • Parking • Sécurisé",
        prix: "45 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
        ville: "parakou",
        nom: "Studio Étudiant",
        description: "1 chambre • Calme • Internet",
        prix: "20 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    {
        ville: "parakou",
        nom: "Appartement Luxe Nord",
        description: "3 chambres • Climatisation",
        prix: "65 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80"
    },

    

];


// DOM
const bouton = document.getElementById("rechercher");
const ville = document.getElementById("ville");
const cards = document.querySelector(".cards");
const zone = document.getElementById("reservations");

// ================= AFFICHAGE APPARTEMENTS =================
function afficherAppartements(liste) {

    cards.innerHTML = "";

    liste.forEach(app => {

        cards.innerHTML += `
            <div class="card">
                <img src="${app.image}">
                <div class="card-content">
                    <h3>${app.nom}</h3>
                    <p>${app.description}</p>
                    <p class="price">${app.prix}</p>
                    <button class="btn reserver">Réserver</button>
                </div>
            </div>
        `;

    });

    activerReservation();

}

// affichage initial
afficherAppartements(appartements);

// ================= RECHERCHE =================
bouton.addEventListener("click", function () {

    if (ville.value === "") {
        afficherAppartements(appartements);
        return;
    }

    let resultats = appartements.filter(a => a.ville === ville.value);

    afficherAppartements(resultats);

});

// ================= FORMULAIRE DE RESERVATION =================
function activerReservation() {

    document.querySelectorAll(".reserver").forEach(btn => {

        btn.addEventListener("click", function () {

            let appartement = this.parentElement.querySelector("h3").innerText;

            afficherFormulaire(appartement);

        });

    });

}

// ================= FORMULAIRE DANS LA PAGE =================
function afficherFormulaire(appartement) {

    // éviter doublon
    let oldForm = document.querySelector(".form-reservation");
    if (oldForm) oldForm.remove();

    let form = document.createElement("div");
    form.classList.add("form-reservation");

    form.innerHTML = `
        <div class="form-box">
            <h3>Réservation : ${appartement}</h3>

            <input type="text" id="nom" placeholder="Nom complet">
            <input type="text" id="tel" placeholder="Téléphone">
            <input type="date" id="date">

            <button id="valider">Valider</button>
            <button id="fermer">Fermer</button>
        </div>
    `;

    document.body.appendChild(form);

    // valider
    document.getElementById("valider").addEventListener("click", function () {

        let nom = document.getElementById("nom").value;
        let tel = document.getElementById("tel").value;
        let date = document.getElementById("date").value;

        if (!nom || !tel || !date) return;

        let reservation = {
            nom,
            tel,
            date,
            appartement
        };

        let data = JSON.parse(localStorage.getItem("res")) || [];

        data.push(reservation);

        localStorage.setItem("res", JSON.stringify(data));

        form.remove();

        afficherReservations();

    });

    // fermer
    document.getElementById("fermer").addEventListener("click", function () {
        form.remove();
    });

}

// ================= AFFICHER RESERVATIONS =================
function afficherReservations() {

    zone.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("res")) || [];

    data.forEach((r, i) => {

        zone.innerHTML += `
            <div class="resv">
                <p><b>${r.appartement}</b></p>
                <p>${r.nom}</p>
                <p>${r.tel}</p>
                <p>${r.date}</p>
                <button onclick="supprimer(${i})">Supprimer</button>
            </div>
        `;

    });

}

// supprimer
function supprimer(i) {

    let data = JSON.parse(localStorage.getItem("res")) || [];

    data.splice(i, 1);

    localStorage.setItem("res", JSON.stringify(data));

    afficherReservations();

}

afficherReservations();