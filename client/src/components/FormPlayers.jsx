export default function FormPlayers() {

  return (

    <form className="mt-3">
      <div className="mb-3">
        <input type="name" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Inserisci il nome" />
      </div>
      <div className="mb-3">
        <input type="number" className="form-control" id="price" placeholder="Prezzo" />
      </div>
      <button type="submit" className="btn btn-primary text-center">Conferma</button>
    </form>
  )
}
