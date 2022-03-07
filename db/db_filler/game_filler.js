var fs = require('fs');
content = fs.readFileSync('./data_set/game.json');
var data = JSON.parse(content);

var mysql = require('mysql2/promise');

let con;

(async () => {
    try {
       con = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    } catch (e) {
        throw e
    }
    
    await call();
})();

async function call() {
  await main();
  
  closeMysqlConnection();
}

async function insertGames (games) {
  await Promise.all(games.map((game) => con.query('INSERT INTO game SET ?', { nom: game.title })))
  
  return con.query('SELECT * FROM game')
}

async function insertThemes(themes) {
  await Promise.all(themes.map((theme) => con.query('INSERT INTO theme SET ?', { name: theme.name })))
  
  return con.query('SELECT * FROM theme')
}

async function insertGamesThemes(games, themes) {
  await Promise.all(games.map(async game => {
    const localGame = data.games.find(item => item.title === game.nom);
    
    const primaryTheme = data.themes.find(theme => theme.id === localGame.themes.primary);
    const secondaryTheme = data.themes.find(theme => theme.id === localGame.themes.secondary);
    
    const primaryThemeId = themes.find(item => item.name === primaryTheme.name).id_theme;
    const secondaryThemeId = themes.find(item => item.name === secondaryTheme.name).id_theme;
    
    await Promise.all([primaryThemeId, secondaryThemeId].map((themeId, position) =>
      con.query('INSERT INTO game_theme SET ?', {
        game_id: game.id_game,
        theme_id: themeId,
        position: position + 1
      }))
    )
  }))
}

async function main() {
  const [themes] = await insertThemes(data.themes)
  const [games] = await insertGames(data.games)
  
  await insertGamesThemes(games, themes)
}

function closeMysqlConnection() {
    con.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
    con.destroy();
}
