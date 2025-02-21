import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from "bootstrap";
import axios from 'axios';
import { useEffect } from 'react';

export default function RemovePartecipant({ id, type }) {

  // Funzione per eliminare un partecipante
  const deletePartecipante = () => {
    if (!id) {
      console.error("ID non definito!");
      return;
    }

    axios.delete(`http://localhost:3000/api/fantacalcio/${type}/${id}`)
      .then(res => {
        console.log('Partecipante eliminato');
        window.location.reload(); // Ricarica la pagina dopo l'eliminazione
      })
      .catch(err => console.error("Errore durante l'eliminazione:", err));
  };

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => new Tooltip(tooltip));
  }, []);

  return (
    <button
      className="btn btn-sm btn-outline-danger ms-2"
      data-bs-toggle="tooltip"
      title="Elimina Partecipante"
      onClick={deletePartecipante}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )
}