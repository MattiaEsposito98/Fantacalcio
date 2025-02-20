import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ProprietarioCard() {
  const { partecipanti } = useContext(GlobalContext);

  // Supponendo che i partecipanti contengano un array di oggetti
  // contenente i dati del proprietario e i calciatori
  const proprietari = partecipanti.reduce((acc, parte) => {
    const { proprietario_nome, crediti_totali, crediti_rimanenti, calciatore_nome, costo } = parte;

    if (!acc[proprietario_nome]) {
      acc[proprietario_nome] = {
        crediti_totali,
        crediti_rimanenti,
        calciatori: []
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
          {Object.keys(proprietari).map((nome, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={nome} style={{ marginBottom: "1rem" }}>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">
                  <h4 className="text-center">{nome}</h4>
                  <p>Crediti Totali: {proprietari[nome].crediti_totali}</p>
                  <p>Crediti Rimanenti: <strong>{proprietari[nome].crediti_rimanenti}</strong></p>
                </div>
                <ul className="list-group list-group-flush">
                  {proprietari[nome].calciatori.map((calciatore) => (
                    <li className="list-group-item" key={calciatore.calciatore_nome}>
                      {calciatore.calciatore_nome} - Prezzo: {calciatore.costo}
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
