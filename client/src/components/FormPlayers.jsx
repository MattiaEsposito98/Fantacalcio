import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";

const initialFormData = {
  nome: "",
  costo: "",
};

export default function FormPlayers({ id }) {
  const [formData, setFormData] = useState(initialFormData);
  const { fetchPartecipanti } = useContext(GlobalContext);

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Dati inviati:', { ...formData, id_proprietario: id });
    axios.post(`http://localhost:3000/api/fantacalcio/calciatori`, {
      ...formData, // Dati del calciatore
      id_proprietario: id // Aggiungi l'id del proprietario
    })
      .then(res => {
        console.log('Dati Calciatore inviati', res.data);
        setFormData(initialFormData)
        fetchPartecipanti()
      })
      .catch(err => console.error('Errore nella richiesta per i calciatori', err));
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <input
          type="text"
          name="nome"
          className="form-control"
          id="name"
          aria-describedby="nameHelp"
          placeholder="Inserisci il nome"
          value={formData.nome}
          onChange={handleFormData}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          name="costo"
          className="form-control"
          id="price"
          placeholder="Prezzo"
          value={formData.costo}
          onChange={handleFormData}
        />
      </div>
      <button type="submit" className="btn btn-primary text-center">Conferma</button>
    </form>
  );
}
