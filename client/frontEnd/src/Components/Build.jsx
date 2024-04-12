import React from 'react'
import Motherboard from './Motherboard'
import Processor from './Processor'
import SMPS from './SMPS'
import RAM from './RAM'
import Storage from './Storage'
import Cabinet from './Cabinet'
import GraphicsCard from './GraphicsCard'

const Build = () => {
  return (
    <div>
        <Processor/>
        <Motherboard/>
        <GraphicsCard/>
        <RAM/>
        <Storage/>
        <SMPS/>
        <Cabinet/>
    </div>
  )
}

export default Build
