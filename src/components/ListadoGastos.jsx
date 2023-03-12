import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados

}) => {
  return (
    <div className='listado-gastos contenedor'>
      { // si hay un filtro se itera sobre los gastos filtrados
        filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos en esta categoria'}</h2>
            {gastosFiltrados.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : ( //en caso de que no haya un filtro se itera sobre todos los gastos
          <>
            <h2>{gastos.length ? 'Gastos' : 'No HayGastos aún'}</h2>
            {gastos.map(gasto => (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos