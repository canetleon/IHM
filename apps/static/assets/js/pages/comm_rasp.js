'use strict';


// fonction post pour envoyer les infos de l'IHM à la raspberry
export function Post(Categorie,Donnes) {

  let data = {}

    if (Categorie == "Stockage") {
      data = {"nouveau_stockage" : Donnes.nouveau_stockage, "emplacement" : Donnes.emplacement}
    } else if (Categorie == "Commande") {
      data = {"nouveau_mode" : Donnes.nouveau_mode, "commande_numerique" : Donnes.commande_numerique}
    } else if (Categorie == "Connexion") {
      data = {"nouveau_mode_connexion" : Donnes.nouveau_mode_connexion, "num_mission" : Donnes.num_mission}
    } else {
      data = {}
    }
    //alert(Niveau1 + " " + Niveau2 + " " + Nom + " " + Valeur )
    fetch('http://159.31.65.235:3100/com/'+Categorie, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(response => { 
                          console.log(response.data + " console started")
  }
  )
    
}

// fonction get pour récup les infos de la raspberry
function Get() {


  fetch('http://159.31.65.235:3100/com', {
  method: 'GET',
  mode: 'cors',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({'capteur' : 1})
})
.then(response => response.json())
.then(response => { 
                        console.log(response.data + " console started")
}
)
  
}

