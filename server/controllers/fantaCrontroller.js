const connection = require('../data/data')

//HomePage
function proprietari(req, res) {
  const sql = `
  SELECT 
	  proprietari.id_proprietario,
    proprietari.nome AS proprietario_nome, 
    proprietari.crediti_totali, 
    proprietari.crediti_rimanenti, 
    calciatori.nome AS calciatore_nome, 
    calciatori.costo,
    calciatori.id_calciatore
  FROM 
    db_fantacalcio.proprietari
  Left JOIN 
    calciatori ON proprietari.id_proprietario = calciatori.id_proprietario
  ORDER BY 
    proprietari.id_proprietario;`

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database propietari failed' })
    res.json(results)
  })
}


//addPlayer
function AddPlayer(req, res) {
  const { nome, crediti_totali } = req.body;

  if (!nome || crediti_totali === undefined) {
    return res.status(400).json({ message: 'Nome e crediti devono essere obbligatori' });
  }

  const creditiNumerici = Number(crediti_totali);
  if (isNaN(creditiNumerici)) {
    return res.status(400).json({ message: 'I crediti devono essere un numero valido' });
  }

  const sql = `INSERT INTO db_fantacalcio.proprietari (nome, crediti_totali) VALUES (?, ?);`;

  connection.query(sql, [nome, creditiNumerici], (err, results) => {
    if (err) {
      console.error('Errore nell’inserimento del partecipante nel database:', err);
      return res.status(500).json({ message: 'Errore del server' });
    }

    return res.status(201).json({ message: 'Partecipante aggiunto con successo', id: results.insertId });
  });
}

//Aggiungere calciatori
function addPlayerOfFootball(req, res) {
  const { nome, costo, id_propietario } = req.body
  const sql = `
  INSERT INTO db_fantacalcio.calciatori (nome, costo, id_proprietario) VALUES (?, ?, ?);
  `
  connection.query(sql, [nome, costo, id_propietario], (err, results) => {
    if (err) {
      console.error(`Errore nell'inserimento del calciatore nel database`, err);
      return res.status(500).json({ message: 'Errore del server' })
    }

    return res.status(201).json({ message: 'Calciatore aggiunto con successo', id: results.insertId });

  })
}

// Delete Partecipanete o calciatore
function removeGeneric(req, res) {
  const { type, id } = req.params
  let sql = ''

  if (type === 'proprietario') {
    sql = `DELETE FROM db_fantacalcio.proprietari WHERE id_proprietario = ?`
  } else if (type === 'calciatore') {
    sql = `DELETE FROM db_fantacalcio.calciatori WHERE id_calciatore = ?`
  } else {
    return res.status(400).json({ error: 'Tipo non valido' })
  }

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Eliminazione non riuscita' })
    res.json(results)
  })
}



module.exports = { proprietari, AddPlayer, removeGeneric, addPlayerOfFootball }
