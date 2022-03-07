var fs = require('fs');
var query = require("./queryfile")
content = fs.readFileSync('./reservation.json');
var data = JSON.parse(content);

function get_VR(VR) {
    if(VR == "Non") {
        return 0
    }
    else {
        return 1   
    }
}

function parsing_json(obj) {
 
    var acheteur = {civilite: obj.Acheteur.Civilite, nom: obj.Acheteur.Nom, prenom: obj.Acheteur.Prenom, age: obj.Acheteur.Age, email: obj.Acheteur.Email, last_update: new Date(), created_date: new Date()};
    var game = {nom: obj.Game.Nom, jour: obj.Game.Jour, horaire: obj.Game.Horaire, VR:obj.Game.VR}; 
    var reservation = {date: obj.Game.Jour, VR: obj.Game.VR}
    var game_creneau_reservation = {}
    var game_creneau = {}
    var reservation_spectateur = {}
    var spectateur_tarif = {}
    var spectateurs = obj.Reservation.map(reservation => ({ civilite: reservation.Spectateur.Civilite, nom: reservation.Spectateur.Nom, prenom: reservation.Spectateur.Prenom, age: reservation.Spectateur.Age, last_update: new Date(), created_date: new Date()}));
    var tarif = obj.Reservation.map(tarif => ({ tarif : tarif.Tarif}));
    return {acheteur, game, spectateurs, reservation, game_creneau_reservation, game_creneau, tarif, reservation_spectateur, spectateur_tarif}
};

async function insert_data({ acheteur, game, spectateurs, reservation, game_creneau_reservation, game_creneau, tarif, reservation_spectateur, spectateur_tarif}) {
    const check_user = await query.get_user_id(acheteur.email)
    console.log(check_user)

    if(!check_user.result[0]) {
        const result = await query.get_role("client")
        
        acheteur.role_id = result.result[0].id_role
        query.insert_data("user", acheteur)
    }

    const bool = get_VR(reservation.VR)
    const id_user = await query.get_user_id(acheteur.email)

    reservation.VR = bool
    reservation.user_id = id_user.result[0].id_user
    query.insert_data("reservation", reservation)

    const result_game = await query.get_game(game.nom)
    const result_creneau = await query.get_creneau(game.horaire)

    game_creneau.game_id = result_game.result[0].id_game
    game_creneau.creneau_id = result_creneau.result[0].id_creneau
    query.insert_data("game_creneau", game_creneau)

    const result_reservation = await query.get_reservation(id_user.result[0].id_user)
    const id_game_creneau = await query.get_game_creneau_id()

    game_creneau_reservation.reservation_id = result_reservation.result[0].idReservation
    game_creneau_reservation.game_creneau_id = id_game_creneau.result[0].id
    query.insert_data("game_creneau_reservation", game_creneau_reservation)

    for(var k in spectateurs) { 
        query.insert_data("spectateur", spectateurs[k])

        const id_Tarif = await query.get_tarif(tarif[k].tarif)
        const id_spectateur = await query.get_id_spectateur()

        spectateur_tarif.tarif_id = id_Tarif.result[0].id_tarif
        spectateur_tarif.spectateur_id = id_spectateur.result[0].idspectateur
        query.insert_data("spectateur_tarif", spectateur_tarif)

        const result_reservation = await query.get_reservation(id_user.result[0].id_user)

        reservation_spectateur.reservation_id = result_reservation.result[0].idReservation
        reservation_spectateur.spectateur_id = id_spectateur.result[0].idspectateur
        query.insert_data("reservation_spectateur", reservation_spectateur)
    }
}

module.exports = {
    insert_data: insert_data,
    parsing_json: parsing_json
}
