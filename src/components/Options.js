import React, { Component } from 'react'

export default class Options extends Component {


  render() {
    const { botella, selected } = this.props

    return (
      <li>
        <img className="circle responsive-img col s2" src={botella.imgPath} alt="botella_img" />
        <a className="col s10" href="#!" onClick={() => selected(botella.key, botella.nombre, botella.marca, botella.grado)}>
          {`${botella.nombre} ${botella.marca}`}
          <br></br>
          <span style={{ fontSize: '0.9em' }}>
            {`${botella.grado !== 0 ? (botella.grado + 'º') : ''}`}
          </span>
        </a>
      </li>
    )
  }
}
