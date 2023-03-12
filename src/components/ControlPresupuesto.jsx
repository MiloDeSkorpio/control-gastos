import { useState,useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos, 
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
}) => {
    const [porcentaje,setPorcentaje] = useState(0)
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total,0)
        const totalDisponible = presupuesto - totalGastado
        //calcualr porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(()=> {
            setPorcentaje(nuevoPorcentaje)
        },1000)
    },[gastos])
    //formatear la cantidad con comas, puntos y signo de dollar Ej. $1,000.00
    const fomatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar la App?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        } 
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#d12222': '#3B82F6',
                    trailColor: '#B8B8B8',
                    textColor:  porcentaje > 100 ? '#d12222': '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className="contenido-presupuesto">
            <button 
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span>{fomatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{fomatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{fomatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto