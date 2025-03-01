import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Buttons from "../components/Buttons";
import FormPlayers from "../components/FormPlayers";
import AddParticipant from "../components/AddParticipant";
import ButtonAddPartecipant from "../components/ButtonAddPartecipant";
import RemovePartecipant from "../components/RemovePartecipant";

export default function ProprietarioCard() {
  const { partecipanti } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState({})  // {} Un oggetto ti permette di gestire lo stato individuale di ogni proprietario invece di avere un unico valore globale.
  const [showPlayers, setShowPlayers] = useState({})

  // Creazione delle card per ogni partecipante
  const proprietari = partecipanti.reduce((acc, parte) => {
    const { proprietario_nome, crediti_totali, crediti_rimanenti, id_proprietario } = parte;

    if (!acc[id_proprietario]) {
      acc[id_proprietario] = {
        proprietario_nome,
        crediti_totali,
        crediti_rimanenti,
        calciatori: [],
      };
    }

    // Aggiungi il calciatore associato
    const calciatore = {
      calciatore_nome: parte.calciatore_nome,
      costo: parte.costo,
      id_calciatore: parte.id_calciatore,
      id_proprietario
    };

    if (calciatore.calciatore_nome) {
      acc[id_proprietario].calciatori.push(calciatore);
    }

    return acc;
  }, {});

  return (
    <>
      <h1 className="text-center">Fantacalcio</h1>
      <ButtonAddPartecipant />
      <div className="container">
        <div className="row">
          {Object.keys(proprietari).length > 0 ? (
            Object.keys(proprietari).map((id_proprietario) => (
              <div className="col-12 col-md-6 col-lg-3" key={id_proprietario} style={{ marginBottom: "1rem" }}>
                <div className="card bg-info-subtle" style={{ width: "100%" }}>
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <h4 className="text-center">{proprietari[id_proprietario].proprietario_nome}</h4>
                      <RemovePartecipant id={id_proprietario} type="proprietario" />
                    </div>

                    <p>Crediti Totali: {proprietari[id_proprietario].crediti_totali}</p>
                    <p>Crediti Rimanenti: <strong>{proprietari[id_proprietario].crediti_rimanenti}</strong></p>
                    <button
                      type="button"
                      className="btn btn-info me-3"
                      onClick={() =>
                        setShowForm(((prev) => ({
                          ...prev,
                          [id_proprietario]: !prev[id_proprietario],
                        })))
                      }
                    >
                      {showForm[id_proprietario] ? '@---> ↑ <---@' : 'Aggiungi Calciatore  ↓'}
                    </button>
                    {showForm[id_proprietario] && <FormPlayers id={id_proprietario} />}
                  </div>
                  <button type="button" className="btn btn-light" onClick={() =>

                    setShowPlayers((prev) => ({                          //prev contiene lo stato precedente di showPlayers,
                      ...prev,                                          //...prev mantiene inalterati gli altri valori nello stato, cioè non cancella gli altri proprietari.
                      [id_proprietario]: !prev[id_proprietario],       // [id_proprietario]: !prev[id_proprietario] cambia SOLO il valore per il proprietario cliccato
                    }))
                  }

                  >
                    {showPlayers[id_proprietario] ? '↑' : '↓'} Calciatori: {proprietari[id_proprietario].calciatori.length}
                  </button>

                  <ul className="list-group list-group-flush">
                    {showPlayers[id_proprietario] && proprietari[id_proprietario].calciatori.map((calciatore) => (
                      <li className="list-group-item" key={calciatore.id_calciatore}>
                        {calciatore.calciatore_nome} {calciatore.costo && `- Prezzo: ${calciatore.costo}`}
                        <Buttons id={calciatore.id_calciatore} type="calciatore" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <AddParticipant />
          )}
        </div>
      </div>
    </>
  );


}
