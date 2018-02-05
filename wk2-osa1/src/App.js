import React from 'react'
import Kurssi from './components/Kurssi'


const App = ({kurssit}) => {
  return (
      <div>
         <div>
             <h1> Opetusohjelma </h1>
          </div>
          <div>
        <ul>
        {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
        
        </ul>
          </div>
      </div>
    )
}

export default App;
