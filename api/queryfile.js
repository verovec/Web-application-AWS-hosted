var db = require("./connectDb");

function insert_data(table, values){
    db.con.query('INSERT INTO '+ table +' SET ?', [values], function(err,result) {
        if(err) {
           console.log(err)
        }
       else {
           console.log(result.insertId)
           return result.insertId
        }
      })
}

async function get_id_spectateur(){
    return new Promise((resolve, reject) => {
        db.con.query('SELECT idspectateur FROM vdmescape.spectateur ORDER BY idspectateur DESC LIMIT 1', function(err, result){
           resolve({error:err, result});
           return result
        })
    })
}

async function get_role(role) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_role FROM vdmescape.role WHERE nom = "'+ role +'"', function(err, result){
           resolve({error:err, result});
        })
    })
}

async function get_game(game) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_game FROM vdmescape.game WHERE nom = "'+ game +'"', function(err, result){
           resolve({error:err, result});
        })
    })
}


async function get_creneau(creneau) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_creneau FROM vdmescape.creneau WHERE horaire = "'+ creneau +'"', function(err, result){
           resolve({error:err, result});
        })
    })
}

async function get_game_creneau_id() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id FROM vdmescape.game_creneau ORDER BY id DESC LIMIT 1', function(err, result){
           resolve({error:err, result});
        })
    })
}

async function get_user_id(email) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_user FROM vdmescape.user WHERE email = "'+ email +'"', function(err, result){
            resolve({error:err, result});
        })
    })
}

async function get_last_user_insert() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_user FROM vdmescape.user ORDER BY id_user DESC LIMIT 1', function(err, result){
           resolve({error:err, result});
        })
    })
}

async function get_reservation(user_id) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT idReservation FROM vdmescape.reservation WHERE user_id = "' + user_id + '"', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_tarif(tarif) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT id_tarif FROM vdmescape.tarif WHERE nom = "' + tarif + '"', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_last_insertID(tarif) {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT LAST_INSERT_ID()', function(err, result){
        resolve({error:err, result});
        })
    })
}
async function get_themesReservation(id) {
    return new Promise((resolve, reject) => {
        db.con.query('select distinct name from vdmescape.theme th ' +
        'inner join vdmescape.game_theme gt on th.id_theme = gt.theme_id ' +
        'inner join vdmescape.game gm on gt.game_id = gm.id_game ' +
        'inner join vdmescape.game_creneau gc on gm.id_game = gc.game_id ' +
        'inner join vdmescape.game_creneau_reservation gcr on gc.id = gcr.game_creneau_id ' +
        'where gcr.reservation_id = ' + id + '', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_list_reservation() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT idReservation, rsv.VR, rsv.date, usr.nom, usr.prenom, cr.horaire, sum(trf.prix) as prix, count(rsv_spc.spectateur_id) as nb_spectateur FROM vdmescape.reservation rsv ' + 
        'inner join vdmescape.user usr on usr.id_user = rsv.user_id ' + 
        'inner join vdmescape.reservation_spectateur rsv_spc on rsv.idReservation = rsv_spc.reservation_id '+
        'inner join vdmescape.game_creneau_reservation gcr on rsv.idReservation = gcr.reservation_id '+
        'inner join vdmescape.game_creneau gc on gcr.game_creneau_id = gc.id '+
        'inner join vdmescape.creneau cr on gc.creneau_id = cr.id_creneau '+
        'inner join vdmescape.spectateur_tarif spctrf on rsv_spc.spectateur_id = spctrf.spectateur_id '+
        'inner join vdmescape.tarif trf on spctrf.tarif_id = trf.id_tarif '+
        'GROUP BY idReservation, rsv.VR, rsv.date, usr.nom, usr.prenom, cr.horaire ', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_spectateur_par_game() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT gm.nom as game, count(rsv_spc.spectateur_id) nb_spectateur FROM vdmescape.reservation rsv ' +
        'inner join vdmescape.reservation_spectateur rsv_spc on rsv.idReservation = rsv_spc.reservation_id ' +
        'inner join vdmescape.game_creneau_reservation gcr on rsv.idReservation = gcr.reservation_id ' +
        'inner join vdmescape.game_creneau gc on gcr.game_creneau_id = gc.id ' +
        'inner join vdmescape.game gm on gc.game_id = gm.id_game ' +
        'where gc.game_id = gm.id_game ' +
        'group by gm.nom', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_position_theme_par_game() {
    return new Promise((resolve, reject) => {
        db.con.query('select g.nom as game, name as theme, position from vdmescape.game_theme gt ' +
        'inner join vdmescape.game g on gt.game_id = g.id_game ' +
        'inner join vdmescape.theme th on gt.theme_id = th.id_theme', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_reservation_par_horaire() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT horaire, count(*) as nb_reservation FROM vdmescape.reservation rsv ' + 
        'inner join vdmescape.game_creneau_reservation gcr on rsv.idReservation = gcr.reservation_id ' +
        'inner join vdmescape.game_creneau gc on gcr.game_creneau_id = gc.id ' +
        'inner join vdmescape.creneau cr on gc.creneau_id = cr.id_creneau ' +
        'where gc.creneau_id = cr.id_creneau ' +
        'group by horaire', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_reservation_par_game() {
    return new Promise((resolve, reject) => {
        db.con.query('SELECT gm.nom, count(*) as nb_reservation FROM vdmescape.reservation rsv ' +  
        'inner join vdmescape.game_creneau_reservation gcr on rsv.idReservation = gcr.reservation_id ' + 
        'inner join vdmescape.game_creneau gc on gcr.game_creneau_id = gc.id ' +
        'inner join vdmescape.game gm on gc.game_id = gm.id_game ' +
        'where gc.game_id = gm.id_game ' +
        'group by gm.nom', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_info_spectateur(id_reservation) {
    return new Promise((resolve, reject) => {
        db.con.query('select civilite, spc.nom, prenom, age, prix from vdmescape.reservation_spectateur rsv_spc ' +
        'inner join vdmescape.spectateur spc on rsv_spc.spectateur_id = spc.idspectateur ' +
        'inner join vdmescape.spectateur_tarif spctrf on rsv_spc.spectateur_id = spctrf.spectateur_id ' +
        'inner join vdmescape.tarif trf on spctrf.tarif_id = trf.id_tarif ' +
        'where reservation_id = '+ id_reservation + '', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_info_acheteur(id_reservation) {
    return new Promise((resolve, reject) => {
        db.con.query('select civilite, nom, prenom, age, email from vdmescape.reservation rsv ' +
        'inner join vdmescape.user usr on usr.id_user = rsv.user_id ' +
        'where idReservation = '+ id_reservation + '', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_info_game(id_reservation) {
    return new Promise((resolve, reject) => {
        db.con.query('select vr, nom, date, horaire from vdmescape.reservation rsv ' +
        'inner join vdmescape.game_creneau_reservation gcr on rsv.idReservation = gcr.reservation_id ' +
        'inner join vdmescape.game_creneau gc on gcr.game_creneau_id = gc.id ' +
        'inner join vdmescape.creneau cr on gc.creneau_id = cr.id_creneau ' +
        'inner join vdmescape.game gm on gc.game_id = gm.id_game ' +
        'where idReservation = '+ id_reservation + '', function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_women() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as women from vdmescape.spectateur where civilite = 'Madame'", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_men() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as men from vdmescape.spectateur where civilite = 'Monsieur'", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_spectateur() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as spectateurs from vdmescape.spectateur", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_min_18() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as nb from vdmescape.spectateur where age < 18", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_18_25() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as nb from vdmescape.spectateur where age >= 18 and age < 25", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_25_39() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as nb from vdmescape.spectateur where age >= 25 and age <= 39", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_40_54() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as nb from vdmescape.spectateur where age >= 40 and age <= 54", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_nb_max_55() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idspectateur) as nb from vdmescape.spectateur where age >= 55", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_vr() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idReservation) as nb from vdmescape.reservation where VR = 1", function(err, result){
        resolve({error:err, result});
        })
    })
}

async function get_not_vr() {
    return new Promise((resolve, reject) => {
        db.con.query("select count(idReservation) as nb from vdmescape.reservation where VR = 0", function(err, result){
        resolve({error:err, result});
        })
    })
}

module.exports = {
    insert_data: insert_data,
    get_id_spectateur: get_id_spectateur,
    get_role: get_role,
    get_game: get_game,
    get_creneau: get_creneau,
    get_game_creneau_id: get_game_creneau_id,
    get_user_id: get_user_id,
    get_reservation: get_reservation,
    get_tarif: get_tarif,
    get_last_insertID: get_last_insertID,
    get_last_user_insert: get_last_user_insert,
    get_list_reservation: get_list_reservation,
    get_nb_women:  get_nb_women,
    get_nb_men: get_nb_men,
    get_nb_spectateur: get_nb_spectateur,
    get_nb_min_18: get_nb_min_18,
    get_nb_18_25: get_nb_18_25,
    get_nb_25_39: get_nb_25_39,
    get_nb_40_54: get_nb_40_54,
    get_nb_max_55: get_nb_max_55,
    get_vr: get_vr,
    get_not_vr: get_not_vr,
    get_nb_reservation_par_horaire: get_nb_reservation_par_horaire,
    get_nb_reservation_par_game: get_nb_reservation_par_game,
    get_info_spectateur: get_info_spectateur,
    get_info_acheteur: get_info_acheteur,
    get_info_game: get_info_game,
    get_position_theme_par_game: get_position_theme_par_game,
    get_nb_spectateur_par_game: get_nb_spectateur_par_game,
    get_themesReservation: get_themesReservation
}