import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const MSGS = ["¿Cómo estás?", "Ésta es la pequeña shopesha que te tenía preparada", "Realmente no es algo del otro mundo", "Pero quería tener un detalle lindo contigo", "y como soy malo para hacer dibujos", "Se me ocurrió hacer algo combinando en lo que soy bueno.", "así que...", "...", "...", "...", "bueno ya, ahora si", "¿Te gustaría salir conmigo?"]

function App() {

  const [iterador, setIterador] = useState(0)
  const [msg, setMsg] = useState("¡Hola Li!")
  const [enabledButton, setEnabledButton] = useState(false);

  const [buttonsVisibility, setButtonsVisibility] = useState(false);
  const [formVisibility, setFormVisibility] = useState(false);

  const [form, setForm] = useState({ opt: "", date: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    return setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    setTimeout(() => {
      setEnabledButton(true)
    }, 3000)
  }, [])

  const handleClick = () => {
    setIterador(iterador + 1)
    setMsg(MSGS[iterador])

    if ((MSGS.length - 1) === iterador) {
      setEnabledButton(false)
      setButtonsVisibility(true)
      return
    }
  }

  const handleClickConfirmation = () => {
    setButtonsVisibility(false)
    setFormVisibility(true)
    return
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const { data } = await axios.post(import.meta.env.VITE_BACK, form);

      Swal.fire(data.msg + ", ya puedes cerrar la página")

      setIterador(0)
      setMsg("¡Hola Li!")
      setEnabledButton(false);

      setButtonsVisibility(false);
      setFormVisibility(false);

      setForm({ opt: "", date: "" });
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="w-8/12 mx-auto">
      <p className={`${iterador === 1 ? 'animate__animated animate__fadeIn' : ''} animate__fadeIn text-6xl text-white`}>{msg}</p>
      <button className={`${enabledButton ? 'visible animate__animated animate__fadeIn' : 'invisible'} mt-5 p-1 text-xl bg-black text-white rounded-md font-bold`} onClick={() => handleClick()}>Siguiente</button>

      {buttonsVisibility && (
        <div className="flex justify-between">
          <button className="bg-green-500 text-white font-bold p-2 rounded-md" onClick={() => { handleClickConfirmation() }}>Sí❤️</button>

          <p className="text-2xl">O</p>

          <button className="bg-green-500 text-white font-bold p-2 rounded-md" onClick={() => { handleClickConfirmation() }}>Sí❤️</button>
        </div>
      )}

      {formVisibility && (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>

          <h1 className="text-lg font-bold">Eres libre de elegir lo que te gustaría cenar</h1>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

            <div className="flex flex-col">
              <label htmlFor="opt1">
                <img src="./hambu.webp" alt="Imagen Opt 1" />
              </label>
              <input type="radio" name="opt" id="opt1" value="hambu" onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="opt2">
                <img src="./pasta.jpeg" alt="Imagen Opt 2" />
              </label>
              <input type="radio" name="opt" id="opt2" value="pasta" onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="opt3">
                <img src="./pizza.webp" alt="Imagen Opt 3"
                />
              </label>
              <input type="radio" name="opt" id="opt3" value="pizza" onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="opt4">
                <img src="./tacos.webp" alt="Imagen Opt 4" />
              </label>
              <input type="radio" name="opt" id="opt4" value="tacos" onChange={handleChange} />
            </div>

          </div>

          <div className="flex justify-between">
            <label htmlFor="date">Fecha y Hora</label>
            <input type="date" name="date" id="date" min="2024-04-06" onChange={handleChange} />
          </div>

          <button type="submit" className="p-1 bg-black text-white rounded-md font-bold text-xl">Enviar Respuesta ❤️</button>
        </form>
      )}
    </div>

  )
}

export default App
