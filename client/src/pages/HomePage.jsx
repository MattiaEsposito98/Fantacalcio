import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Toast, Popover } from "bootstrap";


export default function ProprietarioCard() {
  const { partecipanti } = useContext(GlobalContext);


  //Per creare in un unica card tutti dati di ogni singolo partecipante
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

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => new Tooltip(tooltip));
  }, []);

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
                      {/* Bottoni per modifiche */}
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary ms-2" data-bs-toggle="tooltip" title="Modifica">
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger ms-2" data-bs-toggle="tooltip" title="Elimina">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className="btn btn-sm btn-outline-success ms-2" data-bs-toggle="tooltip" title="Vendi">
                          <FontAwesomeIcon icon={faSackDollar} />
                        </button>
                      </div>


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
