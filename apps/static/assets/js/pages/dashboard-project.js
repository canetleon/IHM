
HideShowDeconnexion();
HideShowBoutonFermerPince();
HideShowBoutonEteindreEclairage();

//var Statut;
//import { Post } from "./comm_rasp"

stockage1 = true;
stockage2 = true;
stockage3 = true;
stockage4 = true;
stockage5 = true;
stockage6 = true;
stockage7= true;
stockage8 = true;
stockage9 = true;
stockage10 = true;
stockage11 = true;

window.onbeforeunload = function() {

  return "Data will be lost if you leave the page, are you sure?";
};

//Choix du bouton déconnexion
document.querySelector('.bs-tre-button-deconnexion').addEventListener("click", function () {
    Swal.fire({
        title: 'Voulez-vous vraiment vous déconnecter ??',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonchoix: '#3085d6',
        cancelButtonchoix: '#d33',
        confirmButtonText: `OUI`,
        denyButtonText: `NON`,
      }).then((result) => {
        if (result.isConfirmed) {
          Post("connexion",{"mode" : "deconnexion", "information" : {}})
            var Statut = "Deconnecté"
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vous avez été déconnecté avec succès',
                showConfirmButton: false,
                timer: 1500
              })

              var Statut = "<h5>Statut : <i class=\"fas fa-unlink\" style=\"color:#ff0000\"> <t style=\"color:#000000\">Déconnecté</t> </i> <i class=\"fas fa-unlink\" style=\"color:#FF0000\"> </i></h5>"
              document.getElementById("Statut connexion").innerHTML = Statut;


            HideShowConnexion();
            HideShowDeconnexion();
            //eCountUpClock(timer);
            document.getElementById("countup").innerHTML = hour + ":" + minute + ":" + updSecond;
        }
      })
});

//Choix du bouton connexion
document.querySelector('.bs-tre-button-connexion').addEventListener("click", function () {
    (async () => {
        
        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    'opérationnel': 'opérationnel',
                    'dégradé': 'dégradé',
                    'test': 'test'
                })
            }, 10)
        })
        const {
            value: choix
        } = await Swal.fire({
            title: 'Configuration de la mission',
            html:'<label for="swal-input1">Numéro de la mission :</label>' +
                 '<input id="swal-input1" class="swal2-input"><br>' +
                 '<h3>Selectionnez le mode de connexion</h3>',
            input: 'radio',
            focusConfirm: false,
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'Vous devez faire un choix'
                }
                /*return [
                    document.getElementById('swal-input1').valueForm,
                    document.getElementById('swal-input2').valueForm
                ]*/
            },

        })
        if (choix) {
            if (choix == "opérationnel") {
            Post("connexion",{"mode" : "opérationnel",  "information" : {}})
            fakeLoad();
            } else if( choix == "test") {
                var Statut = "<h5>Statut : <i class=\"fas fa-link\" style=\"color:#00ff00\"> <t style=\"color:#000000\">Connecté</t> </i> <i class=\"fas fa-link\" style=\"color:#00ff00\"> </i></h5>"
                document.getElementById("Statut connexion").innerHTML = Statut;
               
                HideShowConnexion();
                HideShowDeconnexion();
                CountUpClock();

                Post("connexion",{"mode" : "test",  "information" : {}})
                //Post("Connexion","Information","NumMission",NumMission)
            } else if( choix == "dégradé") {
              Post("connexion",{"mode" : "dégradé",  "information" : {}})
                // à compléter si nécessaire
            }
            }

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }
    })()
});


// Afficher ou Cacher des bouttons
function HideShowConnexion() {
    var x = document.getElementById("connexion");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowDeconnexion() {
    var x = document.getElementById("deconnexion");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowBoutonFermerPince() {
    var x = document.getElementById("fermer pince");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowBoutonOuvrirPince() {
    var x = document.getElementById("ouvrir pince");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowBoutonAllumerEclairage() {
    var x = document.getElementById("allumer éclairage");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowBoutonEteindreEclairage() {
    var x = document.getElementById("éteindre éclairage");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

// Pince Ouvrir
  document.querySelector('.button-ouvrir-pince').addEventListener("click", function () {
    Swal.fire({
        title: 'Voulez-vous vraiment ouvrir la pince ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonchoix: '#3085d6',
        cancelButtonchoix: '#d33',
        confirmButtonText: `OUI`,
        denyButtonText: `NON`,
      }).then((result) => {

        if (result.isConfirmed) {

            var Statut = "<h5>Statut Pince : <i class=\"fas fa-lock-open\" style=\"color:#00ff00\"> <t style=\"color:#000000\">Ouvert</t> </i> <i class=\"fas fa-lock-open\" style=\"color:#00ff00\"> </i></h5>"

            document.getElementById("pince").innerHTML = Statut;
            Post("commande",{"mode" : "", "commande_numerique" : {"ouvrir_pince" : true, "fermer_pince" : false}})
            HideShowBoutonFermerPince();
            HideShowBoutonOuvrirPince();
        }
      })
});

// Pince Fermer
document.querySelector('.button-fermer-pince').addEventListener("click", function () {
    Swal.fire({
        title: 'Voulez-vous vraiment fermer la pince ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonchoix: '#3085d6',
        cancelButtonchoix: '#d33',
        confirmButtonText: `OUI`,
        denyButtonText: `NON`,
      }).then((result) => {

        if (result.isConfirmed) {

            var Statut = "<h5>Statut Pince : <i class=\"fas fa-lock\" style=\"color:#ff0000\"> <t style=\"color:#000000\">Fermée</t> </i> <i class=\"fas fa-lock\" style=\"color:#FF0000\"> </i></h5>"

            document.getElementById("pince").innerHTML = Statut;
            Post("commande",{"mode" : "", "commande_numerique" : {"fermer_pince" : true, "ouvrir_pince" : false}})
            HideShowBoutonFermerPince();
            HideShowBoutonOuvrirPince();
        }
      })
});

// Allumer Éclairage
document.querySelector('.button-allumer-éclairage').addEventListener("click", function () {

            var Statut = "<h5>Statut éclairage : <i class=\"fas fa-lightbulb\" style=\"color:#00ff00\"> <t style=\"color:#000000\">ON</t> </i> <i class=\"fas fa-lightbulb\" style=\"color:#00ff00\"> </i></h5>"
            document.getElementById("éclairage").innerHTML = Statut;
            
            HideShowBoutonAllumerEclairage()
            HideShowBoutonEteindreEclairage()
            Post("commande",{"mode" : "", "commande_numerique" : {"eclairage" : true}})
        });

// Éteindre Éclairage
document.querySelector('.button-éteindre-éclairage').addEventListener("click", function () {

  
    var Statut = "<h5>Statut éclairage : <i class=\"fas fa-lightbulb\" style=\"color:#ff0000\"> <t style=\"color:#000000\">OFF</t> </i> <i class=\"fas fa-lightbulb\" style=\"color:#FF0000\"> </i></h5>"

    document.getElementById("éclairage").innerHTML = Statut;
    
    HideShowBoutonAllumerEclairage()
    HideShowBoutonEteindreEclairage()
    Post("commande",{"mode" : "", "commande_numerique" : {"eclairage" : false}})

});



// Fake loader pour le moment
window.fakeLoad = function fakeLoad() {
    let curValue = 1;
    let progress;

    // Make a loader.
    const notice = PNotify.notice({
        title: 'Connexion au SERPE',
        text: '<div class="progress">\n' +
            '  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></' +
            'div>\n' +
            '</' +
            'div>',
        textTrusted: true,
        icon: 'fas fa-sync fa-spin',
        hide: false,
        destroy: true,
        closer: false,
        sticker: false
    });
    
    notice.on('pnotify:afterOpen', () => {
        progress = notice.refs.elem.querySelector(
            '.progress-bar');
        progress.style.width = curValue + '%';
        progress.attributes['aria-valuenow'].value = curValue;
        // Pretend to do something.
        let plus = 1;
        const timer = setInterval(() => {
            if (curValue === 30) {
                plus = 0.25;
                notice.update({
                    title: 'Récupération des données',
                    icon: 'fas fa-sync fa-spin'
                });
            }
            if (curValue === 60) {
                plus = 0.25;
                notice.update({
                    title: 'Initialisation de la basse de données',
                    icon: 'fas fa-sync fa-spin'
                });
            }
            if (curValue === 70) {
                notice.update({
                    title: 'Attente de connexion au SERPE',
                    icon: 'fas fa-sync fa-spin'
                });
            }
            if (curValue === 80) {
                notice.update({
                    title: 'Initialisation du bus CAN',
                    icon: 'fas fa-sync fa-spin'
                });
            }
            if (curValue == 100) {
                notice.update({
                    title: 'Connexion terminée',
                    icon: 'fa fa-check'
                });
                window.clearInterval(timer);
                notice.close();
                var Statut = "<h5>Statut : <i class=\"fas fa-link\" style=\"color:#00ff00\"> <t style=\"color:#000000\">Connecté</t> </i> <i class=\"fas fa-link\" style=\"color:#00ff00\"> </i></h5>"
                document.getElementById("Statut connexion").innerHTML = Statut;
               
                HideShowConnexion();
                HideShowDeconnexion();
                CountUpClock()
            }
            if (curValue >= 110) {
                // Clean up the interval.
               
                return;
                
            }
            
            curValue += plus;
            progress.style.width = curValue + '%';
            progress.attributes['aria-valuenow'].value =
                curValue;
        }, 65);
    });
};

document.querySelector('.stockage11').addEventListener("click", function () {

    const element11 = document.getElementById("stockage11");
    if (element11.className == "btn-lg btn-icon btn-success stockage11") {
    element11.className = "btn-lg btn-icon btn-danger stockage11";
    stockage11 = false;
    Post("stockage",{"nouveau_stockage" : "echantillon1", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage10').addEventListener("click", function () {

    const element11 = document.getElementById("stockage10");
    if (element11.className == "btn btn-icon btn-success stockage10") {
    element11.className = "btn btn-icon btn-danger stockage10";
    stockage10 = false;
    Post("stockage",{"nouveau_stockage" : "frotti10", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage9').addEventListener("click", function () {

    const element11 = document.getElementById("stockage9");
    if (element11.className == "btn btn-icon btn-success stockage9") {
    element11.className = "btn btn-icon btn-danger stockage9";
    stockage9 = false;
    Post("stockage",{"nouveau_stockage" : "frotti9", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage8').addEventListener("click", function () {

    const element11 = document.getElementById("stockage8");
    if (element11.className == "btn btn-icon btn-success stockage8") {
    element11.className = "btn btn-icon btn-danger stockage8";
    stockage8 = false;
    Post("stockage",{"nouveau_stockage" : "frotti8", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage7').addEventListener("click", function () {

    const element11 = document.getElementById("stockage7");
    if (element11.className == "btn btn-icon btn-success stockage7") {
    element11.className = "btn btn-icon btn-danger stockage7";
    stockage7 = false;
    Post("stockage",{"nouveau_stockage" : "frotti7", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage6').addEventListener("click", function () {

    const element11 = document.getElementById("stockage6");
    if (element11.className == "btn btn-icon btn-success stockage6") {
    element11.className = "btn btn-icon btn-danger stockage6";
    stockage6 = false;
    Post("stockage",{"nouveau_stockage" : "frotti6", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage5').addEventListener("click", function () {

    const element11 = document.getElementById("stockage5");
    if (element11.className == "btn btn-icon btn-success stockage5") {
    element11.className = "btn btn-icon btn-danger stockage5";
    stockage5 = false;
    Post("stockage",{"nouveau_stockage" : "frotti5", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage4').addEventListener("click", function () {

    const element11 = document.getElementById("stockage4");
    if (element11.className == "btn btn-icon btn-success stockage4") {
    element11.className = "btn btn-icon btn-danger stockage4";
    stockage4 = false;
    Post("stockage",{"nouveau_stockage" : "frotti4", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage3').addEventListener("click", function () {

    const element11 = document.getElementById("stockage3");
    if (element11.className == "btn btn-icon btn-success stockage3") {
    element11.className = "btn btn-icon btn-danger stockage3";
    stockage3 = false;
    Post("stockage",{"nouveau_stockage" : "frotti3", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage2').addEventListener("click", function () {

    const element11 = document.getElementById("stockage2");
    if (element11.className == "btn btn-icon btn-success stockage2") {
    element11.className = "btn btn-icon btn-danger stockage2";
    stockage2 = false;
    Post("stockage",{"nouveau_stockage" : "frotti2", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});

document.querySelector('.stockage1').addEventListener("click", function () {

    const element11 = document.getElementById("stockage1");
    if (element11.className == "btn btn-icon btn-success stockage1") {
    element11.className = "btn btn-icon btn-danger stockage1";
    stockage1 = false;
    Post("stockage",{"nouveau_stockage" : "frotti1", "emplacement" : {"stockage1" : stockage1, 
    "stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
    "stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
    "stockage10" : stockage10, "stockage11" : stockage11}})
    } else {
        
  }
});


function CountUpClock() {

var seconds = 0

var timer = setInterval(upTimer, 1000);

function upTimer() {

    ++seconds;

    var hour = Math.floor(seconds / 3600);

    var minute = Math.floor((seconds - hour * 3600) / 60);

    var updSecond = seconds - (hour * 3600 + minute * 60);

    document.getElementById("countup").innerHTML = hour + ":" + minute + ":" + updSecond;
    }

}; 


//radio commande numérique, afficher/cacher
document.querySelector('.bs-tre-button-radio3').addEventListener("click", function () {

  Post("commande",{"mode" : "commande_numerique", "commande_numerique" : {}})
  var x = document.getElementById("commande numérique");
  if (x.style.display === "none") {
    x.style.display = "block";
    
  } else {
    x.style.display = "none";
    HideShowCommandeNumerique();
  }

  

});

document.querySelector('.bs-tre-button-radio2').addEventListener("click", function () {

  Post("commande",{"mode" : "joystick", "commande_numerique" : {}})
  var x = document.getElementById("commande numérique");
  if (x.style.display === "none") {
    x.style.display = "block";
    HideShowCommandeNumerique();
  } else {
    x.style.display = "none";
  }


});

document.querySelector('.bs-tre-button-radio1').addEventListener("click", function () {

  Post("commande",{"mode" : "bras_maitre", "commande_numerique" : {}})
  var x = document.getElementById("commande numérique");
  if (x.style.display === "none") {
    x.style.display = "block";
    HideShowCommandeNumerique();
  } else {
    x.style.display = "none";
  }


});

function HideShowCommandeNumerique() {

  
  var x = document.getElementById("commande numérique");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}



// fonction post pour envoyer les infos de l'IHM à la raspberry
function Post(Categorie,Donnes) {
  console.log("fct post" + Categorie )
  console.log(Donnes)

  let requete = {}

    if (Categorie == "stockage") {
      requete = {"nouveau_stockage" : Donnes.nouveau_stockage, "emplacement" : Donnes.emplacement}
    } else if (Categorie == "commande") {     
      requete = {"mode" : Donnes.mode, "commande_numerique" : Donnes.commande_numerique}
    } else if (Categorie == "connexion") {
      requete = {"mode" : Donnes.mode, "information" : Donnes.information}
    } else {
      requete = {"Error" : "Error"}
    }
    console.log(requete);

    const url = 'http://169.254.160.48:8000/com/'+Categorie;
    console.log(url);
    fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requete)
  })
  .then(response => response.json())
  .then(response => { 
    console.log(response)
                          console.log(response + " console started")
                          if (response.status == "error"){
                            setTimeout(function(){
                              Post(Categorie,Donnes)
                            }, 500); 
                          } else if (response.status == "ok"){
                            console.log("ok")
                          } else {
                            alert("error " + response.data.information)
                          }
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




