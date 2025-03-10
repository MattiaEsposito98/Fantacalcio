const connection = require('../data/data')

//HomePage
function proprietari(req, res) {
  const sql = `
  SELECT 
    p.id_proprietario,
    p.nome AS proprietario_nome, 
    p.crediti_totali, 
    (p.crediti_totali - IFNULL(c.somma_costi, 0)) AS crediti_rimanenti,
    cal.nome AS calciatore_nome, 
    cal.costo,
    cal.id_calciatore
  FROM 
    db_fantacalcio.proprietari p
  LEFT JOIN 
    (SELECT id_proprietario, SUM(costo) AS somma_costi FROM calciatori GROUP BY id_proprietario) c
    ON p.id_proprietario = c.id_proprietario
  LEFT JOIN 
    calciatori cal ON p.id_proprietario = cal.id_proprietario
  ORDER BY 
    crediti_rimanenti;`

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database proprietari failed' })
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
  const { nome, costo, id_proprietario } = req.body

  const sql = `
  INSERT INTO db_fantacalcio.calciatori (nome, costo, id_proprietario) VALUES (?, ?, ?);
  `

  if (!nome || !costo || !id_proprietario) {
    return res.status(400).json({ message: "Dati incompleti" });
  }

  connection.query(sql, [nome, costo, id_proprietario], (err, results) => {
    if (err) {
      console.error(`Errore nell'inserimento del calciatore nel database`, err);
      return res.status(500).json({ message: 'Errore del server' })
    }

    return res.status(201).json({ message: 'Calciatore aggiunto con successo', id: results.insertId });

  })
}


//Codice funzionante con trigger
// // Delete Partecipanete o calciatore, aggiorna il database tramite trigger
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
    res.status(204).json(results)
  })
}



module.exports = { proprietari, AddPlayer, removeGeneric, addPlayerOfFootball }
