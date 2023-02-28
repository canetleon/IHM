
HideShowDeconnexion();
HideShowBoutonFermerPince();
HideShowBoutonEteindreEclairage();


//initialisation des variables
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
            HideShowTestConnexion()
            HideShowDeconnexion();
            //eCountUpClock(timer);
            document.getElementById("countup").innerHTML = hour + ":" + minute + ":" + updSecond;
        }
      })
});

//Choix du bouton connexion
document.querySelector('.bs-tre-button-connexion').addEventListener("click", function () {
  (async () => {
      
    Swal.fire({
      title: 'Configuration de la mission',
      html:
        
        '<input id="swal-input1" class="swal2-input" placeholder="Numéro de la mission">' +
        '<input id="swal-input2" class="swal2-input" placeholder="IP de la raspberry pi"><br>' +
        '<legend> Selectionnez le mode de connexion :</legend><br>'+
        '<input type="radio" id="swal-radio1" name="swal-radio" value="opérationnel">' +
        '<label for="swal-radio1">  Opérationnel    </label>' +
        '<input type="radio" id="swal-radio2" name="swal-radio" value="dégradé">' +
        '<label for="swal-radio2">  Dégradé    </label>' +
        '<input type="radio" id="swal-radio3" name="swal-radio" value="test">' +
        '<label for="swal-radio2">  Test</label>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.querySelector('input[name="swal-radio"]:checked').value
        ]
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const [num_mission, ip_raspb, radioValue] = result.value;
        /*if (num_mission.value !== "" || ip_raspb.value !== "" || radioValue.value !== "") {
          console.log("test check value")
        }*/
       
        console.log(`Num mission: ${num_mission}, ip raspb: ${ip_raspb}, Radio Value: ${radioValue}`);
        const choix = radioValue;
        const IP = ip_raspb;
        console.log('ip : '+ip_raspb)
        PostIHM(ip_raspb)
          if (choix == "opérationnel") {
          Post("connexion",{"mode" : "opérationnel",  "information" : {}})
          fakeLoad();
          } else if( choix == "test") {
              var Statut = "<h5>Statut : <i class=\"fas fa-link\" style=\"color:#00ff00\"> <t style=\"color:#000000\">Connecté</t> </i> <i class=\"fas fa-link\" style=\"color:#00ff00\"> </i></h5>"
              document.getElementById("Statut connexion").innerHTML = Statut;
             
              HideShowConnexion();
              HideShowTestConnexion()
              HideShowDeconnexion();
              CountUpClock();

              Post("connexion",{"mode" : "test",  "information" : {}})
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vous avez été connecté avec succès',
                showConfirmButton: false,
                timer: 1500
              })
              //Post("Connexion","Information","NumMission",NumMission)
          } else if( choix == "dégradé") {
            Post("connexion",{"mode" : "dégradé",  "information" : {}})
              // à compléter si nécessaire
          }
          
      }
    })

  })()
});

//Boutton testant toutes les requête vers la raspberry pi
document.querySelector('.bs-tre-button-test-connexion').addEventListener("click", function () {
  Test_connexion_mode_deconnexion = false
  Test_connexion_mode_opérationnel = false
  Test_connexion_mode_test = false
  Test_connexion_mode_dégradé = false
  Test_commande_numerique_pince_true = false
  Test_commande_numerique_pince_false = false
  Test_commande_numerique_pince_stop = false
  Test_commande_numerique_eclairage_true = false
  Test_commande_numerique_eclairage_false = false
  Test_stockage_echantillon = false
  Test_stockage_1= false
  Test_stockage_2= false
  Test_stockage_3= false
  Test_stockage_4= false
  Test_stockage_5= false
  Test_stockage_6= false
  Test_stockage_7= false
  Test_stockage_8= false
  Test_stockage_9= false
  Test_stockage_10= false
  
  Test_commande_commande_numerique = false
  Test_commande_joystick = false
  Test_commande_bras_maitre = false

console.log('test connexion')
async function testpost() {
//initialisation de toutes les variables
const valeur_Test_connexion_mode_deconnexion = await PostTest("connexion",{"mode" : "deconnexion", "information" : {}});
const valeur_Test_connexion_mode_opérationnel = await PostTest("connexion",{"mode" : "opérationnel",  "information" : {}});
const valeur_Test_connexion_mode_test = await PostTest("connexion",{"mode" : "test",  "information" : {}});
const valeur_Test_connexion_mode_dégradé = await PostTest("connexion",{"mode" : "dégradé",  "information" : {}});
const valeur_Test_commande_numerique_pince_true = await PostTest("commande",{"mode" : "", "commande_numerique" : {"pince" : true}});
const valeur_Test_commande_numerique_pince_false = await PostTest("commande",{"mode" : "", "commande_numerique" : {"pince" : false}});
const valeur_Test_commande_numerique_pince_stop =await PostTest("commande",{"mode" : "", "commande_numerique" : {"pince_stop" : true}});
const valeur_Test_commande_numerique_eclairage_true = await PostTest("commande",{"mode" : "", "commande_numerique" : {"eclairage" : true}});
const valeur_Test_commande_numerique_eclairage_false = await PostTest("commande",{"mode" : "", "commande_numerique" : {"eclairage" : false}});
const valeur_Test_stockage_echantillon = await PostTest("stockage",{"nouveau_stockage" : "echantillon1", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_1 = await PostTest("stockage",{"nouveau_stockage" : "frotti1", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_2 = await PostTest("stockage",{"nouveau_stockage" : "frotti2", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_3 = await PostTest("stockage",{"nouveau_stockage" : "frotti3", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_4 = await PostTest("stockage",{"nouveau_stockage" : "frotti4", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_5 = await PostTest("stockage",{"nouveau_stockage" : "frotti5", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_6 = await PostTest("stockage",{"nouveau_stockage" : "frotti6", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_7 = await PostTest("stockage",{"nouveau_stockage" : "frotti7", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_8 = await PostTest("stockage",{"nouveau_stockage" : "frotti8", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_9 = await PostTest("stockage",{"nouveau_stockage" : "frotti1", "emplacement" : {"stockage1" : stockage1, 
"stockage2" : stockage2, "stockage3" : stockage3, "stockage4" : stockage4, "stockage5" : stockage5,
"stockage6" : stockage6, "stockage7" : stockage7, "stockage8" : stockage8, "stockage9" : stockage9,
"stockage10" : stockage10, "stockage11" : stockage11}});
const valeur_Test_stockage_10 = await u
const valeur_Test_commande_commande_numerique = await PostTest("commande",{"mode" : "commande_numerique", "commande_numerique" : {}});
const valeur_Test_commande_joystick = await PostTest("commande",{"mode" : "joystick", "commande_numerique" : {}});
const valeur_Test_commande_bras_maitre = await PostTest("commande",{"mode" : "bras_maitre", "commande_numerique" : {}});


Test_connexion_mode_deconnexion = (valeur_Test_connexion_mode_deconnexion == "ok");
Test_connexion_mode_opérationnel = (valeur_Test_connexion_mode_opérationnel == "ok");
Test_connexion_mode_test = (valeur_Test_connexion_mode_test == "ok")
Test_connexion_mode_dégradé = (valeur_Test_connexion_mode_dégradé == "ok")
Test_commande_numerique_pince_true = (valeur_Test_commande_numerique_pince_true == "ok")
Test_commande_numerique_pince_false = (valeur_Test_commande_numerique_pince_false == "ok")
Test_commande_numerique_pince_stop = (valeur_Test_commande_numerique_pince_stop== "ok")
Test_commande_numerique_eclairage_true = (valeur_Test_commande_numerique_eclairage_true == "ok")
Test_commande_numerique_eclairage_false = (valeur_Test_commande_numerique_eclairage_false == "ok")
Test_stockage_echantillon  = (valeur_Test_stockage_echantillon  == "ok")
Test_stockage_1 = (valeur_Test_stockage_1 == "ok")
Test_stockage_2 = (valeur_Test_stockage_2 == "ok")
Test_stockage_3 = (valeur_Test_stockage_3 == "ok")
Test_stockage_4 = (valeur_Test_stockage_4 == "ok")
Test_stockage_5 = (valeur_Test_stockage_5 == "ok")
Test_stockage_6 = (valeur_Test_stockage_6 == "ok")
Test_stockage_7 = (valeur_Test_stockage_7 == "ok")
Test_stockage_8 = (valeur_Test_stockage_8 == "ok")
Test_stockage_9 = (valeur_Test_stockage_9 == "ok")
Test_stockage_10 = (valeur_Test_stockage_10 == "ok")
Test_commande_commande_numerique  = (valeur_Test_commande_commande_numerique  == "ok")
Test_commande_joystick = (valeur_Test_commande_joystick == "ok")
Test_commande_bras_maitre = (valeur_Test_commande_bras_maitre == "ok")
if (Test_connexion_mode_deconnexion == true && Test_connexion_mode_opérationnel == true && Test_connexion_mode_test == true
  && Test_connexion_mode_dégradé == true && Test_commande_numerique_pince_true == true && Test_commande_numerique_pince_false == true
  && Test_commande_numerique_pince_stop == true && Test_commande_numerique_eclairage_true == true && Test_commande_numerique_eclairage_false == true
  && Test_stockage_echantillon == true && Test_commande_commande_numerique == true && Test_commande_joystick == true && Test_commande_bras_maitre == true
  && Test_stockage_1 == true && Test_stockage_2 == true && Test_stockage_3 == true && Test_stockage_4 == true && Test_stockage_5 == true && Test_stockage_6 == true
  && Test_stockage_7 == true && Test_stockage_8 == true && Test_stockage_9 == true && Test_stockage_10 == true){
    console.log("Tout est ok")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Toutes les trames fonctionnent correctement',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    console.log("Tout est PAS ok")
               Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Vous avez été déconnecté avec succès',
                showConfirmButton: false,
                timer: 1500
              })
  }

}
testpost();


/*if (Test_connexion_mode_deconnexion == true && Test_connexion_mode_opérationnel == true && Test_connexion_mode_test == true
  && Test_connexion_mode_dégradé == true && Test_commande_numerique_pince_true == true && Test_commande_numerique_pince_false == true
  && Test_commande_numerique_pince_stop == true && Test_commande_numerique_eclairage_true == true && Test_commande_numerique_eclairage_false == true
  && Test_stockage_echantillon == true && Test_commande_commande_numerique == true && Test_commande_joystick == true && Test_commande_bras_maitre == true){
    for (let i = 0; i < 10; i++) {
      if (Test_stockage_[i] == true) {
        console.log("Tout est ok")
      } else {
        console.log("Tout est ok sauf le stockage")
      }
}
} else {
  console.log("Pb dans l'une des requête")
}*/

});


//fonction qui reçoit l'ip lors de la connexion et la remplace dans le run.py
function PostIHM(IP) {
  fetch('/post-ip', {method: 'POST'});
  fetch('/post-ip', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ip' : IP })
        })
}


// Afficher ou Cacher des bouttons
function HideShowConnexion() {
    var x = document.getElementById("connexion");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function HideShowTestConnexion() {
    var x = document.getElementById("test connexion");
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
            Post("commande",{"mode" : "", "commande_numerique" : {"pince" : true}})
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
            Post("commande",{"mode" : "", "commande_numerique" : {"pince" : false}})
            HideShowBoutonFermerPince();
            HideShowBoutonOuvrirPince();
        }
      })
});

document.querySelector('.button-stoper-pince').addEventListener("click", function () {
  Post("commande",{"mode" : "", "commande_numerique" : {"pince_stop" : true}})
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
                HideShowTestConnexion()
                HideShowDeconnexion();
                CountUpClock()

                Post("connexion",{"mode" : "test",  "information" : {}})
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Vous avez été connecté avec succès',
                showConfirmButton: false,
                timer: 1500
              })
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
    swalfire_stockage('emplacement','1')
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
    swalfire_stockage('stockage','10')
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
    swalfire_stockage('stockage','9')
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
    swalfire_stockage('stockage','8')
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
    swalfire_stockage('stockage','7')
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
    swalfire_stockage('stockage','6')
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
    swalfire_stockage('stockage','5')
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
    swalfire_stockage('stockage','4')
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
    swalfire_stockage('stockage','3')
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
    swalfire_stockage('stockage','2')
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
    swalfire_stockage('stockage','1')
    } else {
        
  }
});

function swalfire_stockage(type,id_stockage) {
  if (type == 'stockage'){
    titre = 'Vous avez sélectionné le stockage '+id_stockage
    }
  else if (type == 'emplacement') {
    titre = 'Vous avez sélectionné l\'emplacement '+id_stockage
  }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: titre,
    showConfirmButton: false,
    timer: 1500
  })
}

document.querySelector('.bras-maitre-commande').addEventListener("click", function () {

  
    console.log("bras maitre commande")  
      fetch('/post-bras-maitre', {method: 'POST'});
      fetch('/post-bras-maitre', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'bras maitre commande' : 'go'})
            })
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Commande du bras maitre envoyé avec succès',
              showConfirmButton: false,
              timer: 1500
            })

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
  var y = document.getElementById("commande bras maitre");
  if (y.style.display === "none") {
    y.style.display = "block";
    HideShowCommandeBrasMaitre();
    
  } else {
    y.style.display = "none";
    
  }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Vous avez sélectionné avec succès la commande numérique',
    showConfirmButton: false,
    timer: 2500
  })

  

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

  var y = document.getElementById("commande bras maitre");
  if (y.style.display === "none") {
    y.style.display = "block";
    HideShowCommandeBrasMaitre();
  } else {
    y.style.display = "none";
    
  }

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Vous avez sélectionné avec succès la commande par joystick',
    showConfirmButton: false,
    timer: 2500
  })


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

  var y = document.getElementById("commande bras maitre");
  if (y.style.display === "none") {
    y.style.display = "block";
    

  } else {
    y.style.display = "none";
    HideShowCommandeBrasMaitre();
  }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Vous avez sélectionné avec succès la commande avec le bras maitre',
    showConfirmButton: false,
    timer: 2500
  })


});

function HideShowCommandeNumerique() {

  
  var x = document.getElementById("commande numérique");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function HideShowCommandeBrasMaitre() {

  
  var x = document.getElementById("commande bras maitre");
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

    const url = 'http://serpe.local:8000/com/'+Categorie;
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

//fonction POST test
function PostTest(Categorie,Donnes) {
  console.log("fct post test " + Categorie )
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

    const url = 'http://serpe.local:8000/test/'+Categorie;
    console.log(url);
    value = fetch(url, {
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
    return response.status
  }
  )
   return value 
}

// fonction get pour récup les infos de la raspberry
function Get() {


  fetch('http://serpe.local:3100/com', {
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




