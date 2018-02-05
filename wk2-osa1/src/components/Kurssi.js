import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
    <div>
    <div>    
      <h2>{kurssi.nimi}</h2>
    </div>  
    <div>
      <ul> {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa}/>)} </ul>
      <ul> <Reduce osat={kurssi.osat}/> </ul>
    </div>
    </div>
    )
  }

  const Osa = ({ osa }) => {
    return (
      <p>{osa.nimi} {osa.tehtavia}</p>
    )
  }

  const Reduce = ({ osat }) => {   //älkää katsoko syyttävästi olin kipeä aivot eivät toimineet, mutta ainakin reduce löytyy...
    var durr = []
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var i = 0
    for (i = 0; i < osat.length; i++){
        durr[i] = osat[i].tehtavia
    }
    return (
      <p>{durr.reduce(reducer)}</p>
    )
  }


  export default Kurssi