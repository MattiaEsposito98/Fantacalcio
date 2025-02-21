import ButtonAddPartecipant from "./ButtonAddPartecipant"

export default function AddParticipant() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className="text-center">Nessun partecipante è presente</p>
      <ButtonAddPartecipant />
    </div>
  )
}