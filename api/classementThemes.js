var query = require("./queryfile")

function sort(tab){
    var changed;
    do{
        changed = false;
        for(var i=0; i < tab.length-1; i++) {
            if(tab[i].points < tab[i+1].points) {
                var tmp = tab[i];
                tab[i] = tab[i+1];
                tab[i+1] = tmp;
                changed = true;
            }
        }
    } while(changed);
}

async function generate_classement_themes() {

    const nb_spectateur = await query.get_nb_spectateur_par_game()
    const position_theme = await query.get_position_theme_par_game()

    let classement = [];

    for(var i = 0; i < nb_spectateur.result.length; i++) {
        for(var j = 0; j < position_theme.result.length; j++) {
            if(nb_spectateur.result[i].game == position_theme.result[j].game) {
                if(position_theme.result[j].position ==  1) {
                    classement.push({theme: position_theme.result[j].theme, points: nb_spectateur.result[i].nb_spectateur * 3})
                }
                else {
                    classement.push({theme: position_theme.result[j].theme, points: nb_spectateur.result[i].nb_spectateur})
                }
            }
        }
    }
    
    sort(classement); 
    return classement
}

module.exports = {
    generate_classement_themes: generate_classement_themes
}