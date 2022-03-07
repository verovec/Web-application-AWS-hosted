const express = require('express')
const app = express()
var db = require("./connectDb");
var parse = require("./parsefile")
var query = require("./queryfile")
var cors = require('cors')
var utils = require("./classementThemes")
var bodyParser = require('body-parser');

app.use(cors())

db.connectdb();

app.listen(8080, () => {
    console.log('Serveur listening')
})

app.get('/healthcheck', (req, res) => {
    res.send('api up up');
});

app.use(bodyParser());

app.post('/reservation', async function(req,res) { 
    console.log(req.body)
    await parse.insert_data(parse.parsing_json(req.body))
    res.send({status: "OK"})
})

app.post('/titi', async function(req,res) {
    res.send({status: "OK"})
})

app.get('/reservation', async function(req, res) {
    const result = await query.get_list_reservation()
    res.json(result.result)
})

app.get('/reservation/:id', async function(req, res) {
    const id = parseInt(req.params.id)
    const result_spectateurs =  await query.get_info_spectateur(id)
    const result_acheteur =  await query.get_info_acheteur(id)
    const result_game =  await query.get_info_game(id)
    const result_themes = await query.get_themesReservation(id)
    var theme = result_themes.result.map(reservation => ({ name: reservation.name}));
    const result = {spectateurs: result_spectateurs.result, acheteur: result_acheteur.result[0], game: result_game.result[0], themes: theme }
    res.json(result)
})

app.get('/sexe', async function(req, res) {
    const result_women = await query.get_nb_women()
    const result_men = await query.get_nb_men()
    const result_spectateurs = await query.get_nb_spectateur()
    const result = {total:result_spectateurs.result[0].spectateurs, women: result_women.result[0].women, men: result_men.result[0].men}
    res.json(result)
})

app.get('/age', async function(req, res) {
    const result_min_18 = await query.get_nb_min_18()
    const result_18_25 = await query.get_nb_18_25()
    const result_25_39 = await query.get_nb_25_39()
    const result_40_54 = await query.get_nb_40_54()
    const result_max_55 = await query.get_nb_max_55()
    const result = {"moins de 18":result_min_18.result[0].nb, "18-25": result_18_25.result[0].nb, "25-39": result_25_39.result[0].nb, "40-54": result_40_54.result[0].nb, "plus de 55": result_max_55.result[0].nb}
    res.json(result)
})

app.get('/vr', async function(req, res) {
    const vr = await query.get_vr()
    const not_vr = await query.get_not_vr()
    const result = {"total_vr":vr.result[0].nb, "total_not_vr": not_vr.result[0].nb}
    res.json(result)
})

app.get('/slots', async function(req, res) {
    const result = await query.get_nb_reservation_par_horaire()
    res.json(result.result)
})

app.get('/reservationsGame', async function(req, res) {
    const result = await query.get_nb_reservation_par_game()
    res.json(result.result)
})

app.get('/classementThemes', async function(req, res) {
    const result = await utils.generate_classement_themes()
    res.json(result)
})