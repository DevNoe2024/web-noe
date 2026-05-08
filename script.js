// ================= BASE DE DONNÉES APPARTEMENTS =================

let appartements = [

    // ================= COTONOU =================
    {
        ville: "cotonou",
        nom: "Luxe Océan",
        description: "2 chambres • Vue mer • Piscine",
        prix: "60 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        note: "⭐ 4.9",
        disponible: true
    },

    {
        ville: "cotonou",
        nom: "Studio Centre-ville",
        description: "1 chambre • Climatisation • WiFi",
        prix: "35 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        note: "⭐ 4.5",
        disponible: true
    },

    {
        ville: "cotonou",
        nom: "Résidence Côtière",
        description: "3 chambres • Terrasse • Parking",
        prix: "75 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        note: "⭐ 5.0",
        disponible: false
    },

    // ================= PORTO-NOVO =================
    {
        ville: "porto-novo",
        nom: "Villa Royale",
        description: "3 chambres • Luxe • Jardin",
        prix: "55 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        note: "⭐ 4.8",
        disponible: true
    },

    {
        ville: "porto-novo",
        nom: "Appartement Moderne",
        description: "2 chambres • Cuisine équipée • WiFi",
        prix: "40 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
        note: "⭐ 4.6",
        disponible: true
    },

    {
        ville: "porto-novo",
        nom: "Résidence Centre",
        description: "1 chambre • Simple • Propre",
        prix: "25 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
        note: "⭐ 4.2",
        disponible: false
    },

    // ================= PARAKOU =================
    {
        ville: "parakou",
        nom: "Nord Confort",
        description: "2 chambres • Parking • Sécurisé",
        prix: "45 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        note: "⭐ 4.7",
        disponible: true
    },

    {
        ville: "parakou",
        nom: "Studio Étudiant",
        description: "1 chambre • Internet • Calme",
        prix: "20 000 FCFA / nuit",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        note: "⭐ 4.3",
        disponible: true
    }

];


// ================= DOM =================

const bouton = document.getElementById("rechercher");
const ville = document.getElementById("ville");
const cards = document.querySelector(".cards");
const zone = document.getElementById("reservations");


// ================= AFFICHAGE APPARTEMENTS =================

function afficherAppartements(liste){

    cards.innerHTML = "";

    if(liste.length === 0){

        cards.innerHTML = `
            <h2 style="
                color:white;
                text-align:center;
                width:100%;
            ">
                Aucun appartement trouvé
            </h2>
        `;

        return;
    }

    liste.forEach(app => {

        cards.innerHTML += `

        <div class="card">

            <img src="${app.image}">

            <div class="card-content">

                <h3>${app.nom}</h3>

                <p>${app.description}</p>

                <p style="
                    color:gold;
                    margin-top:8px;
                    font-weight:bold;
                ">
                    ${app.note}
                </p>

                <p class="price">${app.prix}</p>

                <p style="
                    margin-bottom:15px;
                    font-weight:bold;
                    color:${app.disponible ? 'limegreen' : 'red'};
                ">
                    ${app.disponible ? 'Disponible' : 'Indisponible'}
                </p>

                <button 
                    class="btn reserver"
                    ${app.disponible ? "" : "disabled"}
                >

                    ${app.disponible ? "Réserver" : "Déjà occupé"}

                </button>

            </div>

        </div>

        `;

    });

    activerReservation();

}

// affichage initial
afficherAppartements(appartements);


// ================= RECHERCHE =================

bouton.addEventListener("click", function(){

    if(ville.value === ""){

        afficherAppartements(appartements);

        return;
    }

    let resultats = appartements.filter(app => {

        return app.ville === ville.value;

    });

    afficherAppartements(resultats);

});


// ================= FORMULAIRE =================

function activerReservation(){

    document.querySelectorAll(".reserver").forEach(btn => {

        btn.addEventListener("click", function(){

            let appartement = this.parentElement.querySelector("h3").innerText;

            afficherFormulaire(appartement);

        });

    });

}


// ================= AFFICHER FORMULAIRE =================

function afficherFormulaire(appartement){

    let ancien = document.querySelector(".form-reservation");

    if(ancien){
        ancien.remove();
    }

    let form = document.createElement("div");

    form.classList.add("form-reservation");

    form.innerHTML = `

    <div class="form-box">

        <h3>
            Réserver : ${appartement}
        </h3>

        <input 
            type="text"
            id="nom"
            placeholder="Nom complet"
        >

        <input 
            type="text"
            id="tel"
            placeholder="Téléphone"
        >

        <input 
            type="email"
            id="email"
            placeholder="Adresse email"
        >

        <input 
            type="date"
            id="date"
        >

        <div class="form-buttons">

            <button id="valider">
                Valider
            </button>

            <button id="fermer">
                Fermer
            </button>

        </div>

    </div>

    `;

    document.body.appendChild(form);


    // ================= VALIDER =================

    document.getElementById("valider")
    .addEventListener("click", function(){

        let nom = document.getElementById("nom").value;
        let tel = document.getElementById("tel").value;
        let email = document.getElementById("email").value;
        let date = document.getElementById("date").value;

        if(!nom || !tel || !email || !date){

            alert("Veuillez remplir tous les champs");

            return;
        }

        let reservation = {

            nom,
            tel,
            email,
            date,
            appartement

        };

        let data =
        JSON.parse(localStorage.getItem("reservations"))
        || [];

        data.push(reservation);

        localStorage.setItem(
            "reservations",
            JSON.stringify(data)
        );

        form.remove();

        afficherReservations();

    });


    // ================= FERMER =================

    document.getElementById("fermer")
    .addEventListener("click", function(){

        form.remove();

    });

}


// ================= AFFICHAGE RÉSERVATIONS =================

function afficherReservations(){

    zone.innerHTML = "";

    let data =
    JSON.parse(localStorage.getItem("reservations"))
    || [];

    if(data.length === 0){

        zone.innerHTML = `
            <h3 style="
                color:white;
                text-align:center;
                width:100%;
            ">
                Aucune réservation enregistrée
            </h3>
        `;

        return;
    }

    data.forEach((r,i) => {

        zone.innerHTML += `

        <div class="resv">

            <p>
                <b>
                    ${r.appartement}
                </b>
            </p>

            <p>
                👤 ${r.nom}
            </p>

            <p>
                📞 ${r.tel}
            </p>

            <p>
                📧 ${r.email}
            </p>

            <p>
                📅 ${r.date}
            </p>

            <button onclick="supprimer(${i})">

                Supprimer

            </button>

        </div>

        `;

    });

}


// ================= SUPPRESSION =================

function supprimer(index){

    let data =
    JSON.parse(localStorage.getItem("reservations"))
    || [];

    data.splice(index,1);

    localStorage.setItem(
        "reservations",
        JSON.stringify(data)
    );

    afficherReservations();

}


// ================= CHARGEMENT INITIAL =================

afficherReservations();


// ================= RECHERCHE AUTOMATIQUE =================

ville.addEventListener("change", function(){

    if(ville.value === ""){

        afficherAppartements(appartements);

        return;
    }

    let resultats = appartements.filter(app => {

        return app.ville === ville.value;

    });

    afficherAppartements(resultats);

});