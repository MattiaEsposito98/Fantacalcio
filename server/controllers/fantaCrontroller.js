const connection = require('../data/data')

function proprietari(req, res) {
  const sql = `
  SELECT 
	  proprietari.id_proprietario,
    proprietari.nome AS proprietario_nome, 
    proprietari.crediti_totali, 
    proprietari.crediti_rimanenti, 
    calciatori.nome AS calciatore_nome, 
    calciatori.costo 
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

module.exports = { proprietari }