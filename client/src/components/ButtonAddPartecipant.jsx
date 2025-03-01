import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

export default function ButtonAddPartecipant() {
  const { setPartecipanti } = useContext(GlobalContext);
  const initialFormData = {
    nome: "",
    crediti_totali: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false); // Stato per mostrare/nascondere il modulo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/fantacalcio', formData)
      .then(response => {
        const newPartecipante = {
          id_proprietario: response.data.id,
          proprietario_nome: formData.nome,
          crediti_totali: Number(formData.crediti_totali),
          crediti_rimanenti: Number(formData.crediti_totali), // o un valore di default
        };

        setPartecipanti(prevPartecipanti => [...prevPartecipanti, newPartecipante]);
        // Resetta il modulo dopo l'invio
        setFormData(initialFormData);
        setShowForm(false); // Nascondi il modulo dopo l'invio
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="mb-3">
      <button
        className="btn btn-primary mb-2 ms-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Annulla" : "Aggiungi Partecipante"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="border p-3 rounded formPlayer" style={{ maxWidth: "400px", margin: "1rem" }}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
              placeholder="Inserisci il nome"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="crediti_totali" className="form-label">Crediti Totali</label>
            <input
              type="number"
              name="crediti_totali"
              id="crediti_totali"
              value={formData.crediti_totali}
              onChange={handleChange}
              className="form-control"
              placeholder="Inserisci i crediti totali"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Aggiungi Partecipante</button>
        </form>
      )}
    </div>
  );
}
