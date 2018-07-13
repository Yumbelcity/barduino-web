import React, { Component } from 'react'
import M from 'materialize-css'
import ModificarBotella from '../../components/Botella/ModificarBotella'

export default class ScreenModificarBotella extends Component {
  constructor(props) {
    super(props)
    this.state = {
      botella: {
        _idBotella: '-LHGFnf2i1vV_WEJF0V6',
        nombre: 'Pisco',
        marca: 'Mistral',
        grado: 35,
        ml: 750,
        imgPath: 'https://firebasestorage.googleapis.com/v0/b/database-test-8d0ae.appspot.com/o/botellas%2Fmistral.jpg?alt=media&token=1dbd5a3e-5b37-4c53-91c5-8e968c87f9cb'
      }
    }
  }

  render() {
    const { botella } = this.state
    return (
      <ModificarBotella botella={botella} />
    )
  }

}