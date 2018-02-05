import React from 'react'

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


  export default Reduce