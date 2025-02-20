import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Buttons from "../components/Buttons";
import FormPlayers from "../components/FormPlayers";

export default function ProprietarioCard() {
  const { partecipanti } = useContext(GlobalContext);
  const [showForm, setshowForm] = useState(false)

  // Creazione delle card per ogni partecipante
  const proprietari = partecipanti.reduce((acc, parte) => {
    const { proprietario_nome, crediti_totali, crediti_rimanenti, calciatore_nome, costo, id_proprietario } = parte;

    if (!acc[proprietario_nome]) {
      acc[proprietario_nome] = {
        crediti_totali,
        crediti_rimanenti,
        calciatori: [],
        id_proprietario // Aggiungi l'ID qui
      };
    }

    acc[proprietario_nome].calciatori.push({ calciatore_nome, costo });
    return acc;
  }, {});

  return (
    <>
      <h1 className="text-center">Fantacalcio</h1>
      <div className="container">
        <div className="row">
          {Object.keys(proprietari).map((nome) => (
            <div className="col-12 col-md-6 col-lg-3" key={nome} style={{ marginBottom: "1rem" }}>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">
                  <h4 className="text-center">{nome}</h4>
                  <p>Crediti Totali: {proprietari[nome].crediti_totali}</p>
                  <p>Crediti Rimanenti: <strong>{proprietari[nome].crediti_rimanenti}</strong></p>
                  <button type="button" className="btn btn-info" onClick={() => setshowForm(!showForm)}>Aggiungi calciatore</button>
                  {showForm && <FormPlayers />}
                </div>

                <ul className="list-group list-group-flush">
                  {proprietari[nome].calciatori.map((calciatore) => (
                    <li className="list-group-item" key={calciatore.calciatore_nome}>

                      {calciatore.calciatore_nome} {calciatore.costo && `- Prezzo: ${calciatore.costo}`}

                      {/* Passa l'ID al componente Buttons */}
                      <Buttons id={proprietari[nome].id_proprietario} />
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
