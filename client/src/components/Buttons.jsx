import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "bootstrap";

export default function Buttons({ id }) {

  // Funzione per eliminare un partecipante
  // const deletePartecipante = () => {
  //   if (!id) {
  //     console.error("ID non definito!");
  //     return;
  //   }

  //   axios.delete(`http://localhost:3000/api/fantacalcio/${id}`)
  //     .then(res => {
  //       console.log('Partecipante eliminato');
  //       window.location.reload(); // Ricarica la pagina dopo l'eliminazione
  //     })
  //     .catch(err => console.error("Errore durante l'eliminazione:", err));
  // };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => new Tooltip(tooltip));
  }, []);

  return (
    <div className="d-flex gap-2">
      <button className="btn btn-sm btn-outline-primary ms-2" data-bs-toggle="tooltip" title="Modifica">
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button
        className="btn btn-sm btn-outline-danger ms-2"
        data-bs-toggle="tooltip"
        title="Elimina"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button className="btn btn-sm btn-outline-success ms-2" data-bs-toggle="tooltip" title="Vendi">
        <FontAwesomeIcon icon={faSackDollar} />
      </button>
    </div>
  );
}