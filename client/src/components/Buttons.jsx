import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Toast, Popover } from "bootstrap";

export default function Buttons() {

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltip => new Tooltip(tooltip));
  }, []);

  return (
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
  )
}