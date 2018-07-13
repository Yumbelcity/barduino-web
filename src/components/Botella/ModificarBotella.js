import React, { Component } from 'react'
import M from 'materialize-css'

//Firebase
import * as firebase from 'firebase'

export default class ModificarBotella extends Component {
  constructor(props) {
    super(props)
    const { botella } = this.props
    this.state = {
      _idBotella: botella._idBotella,
      botella: {
        nombre: botella.nombre,
        marca: botella.marca,
        grado: botella.grado,
        ml: botella.ml,
        imgPath: botella.imgPath
      },
      imageLoaded: true,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    if (e.target.id === 'nombre') {
      let botella = this.state.botella
      this.setState({
        botella: Object.assign({}, botella, {
          nombre: e.target.value
        })
      })
    }
    if (e.target.id === 'marca') {
      let botella = this.state.botella
      this.setState({
        botella: Object.assign({}, botella, {
          marca: e.target.value
        })
      })
    }
    if (e.target.id === 'grado') {
      let botella = this.state.botella
      this.setState({
        botella: Object.assign({}, botella, {
          grado: e.target.value === '' ? '' : parseInt(e.target.value)
        })
      })
    }
    if (e.target.id === 'ml') {
      let botella = this.state.botella
      this.setState({
        botella: Object.assign({}, botella, {
          ml: e.target.value === '' ? '' : parseInt(e.target.value)
        })
      })
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (this.state.imageLoaded) {
      let data = {}
      const key = this.state._idBotella
      data[key] = this.state.botella
      await firebase.database().ref(`botella`).update(data)
        .then(() => {
          M.toast({ html: 'Botella Modificada!', classes: 'rounded green toast-mobile', displayLength: 1000 })
        })
        .catch(err => {
          alert(err.message)
        })
    } else {
      M.toast({ html: 'Debes subir una fotografía de la botella que estás ingresando', classes: 'rounded red toast-mobile', displayLength: 2000 })
    }
  }

  componentDidMount() {
    let image = document.getElementById('imagen')
    image.addEventListener('change', () => {
      let botella = this.state.botella
      this.setState({
        botella: Object.assign({}, botella, {
          imgPath: "https://firebasestorage.googleapis.com/v0/b/database-test-8d0ae.appspot.com/o/botellas%2Fno-image.jpg?alt=media&token=eb9b338f-8805-43c4-92f0-0d81ac3c63b9"
        }),
        loading: true
      })
      let imagenASubir = image.files[0]
      const storageRef = firebase.storage().ref()
      const uploadRef = storageRef.child(`botellas/${imagenASubir.name}`)
      const uploadTask = uploadRef.put(imagenASubir)
        .then(snapshot => {
          uploadRef.getDownloadURL()
            .then(url => {
              let botella = this.state.botella
              this.setState({
                botella: Object.assign({}, botella, {
                  imgPath: url
                }),
                imageLoaded: true,
                loading: false
              })
              M.toast({ html: 'Imagen subida!', classes: 'rounded green toast-mobile', displayLength: 1000 })
            })
            .catch(() => {
              M.toast({ html: 'Error al subir la imagen!', classes: 'rounded red toast-mobile', displayLength: 1000 })
              this.setState({ imageLoaded: false, loading: false })
            })
        })
        .catch(() => {
          M.toast({ html: 'Error al subir la imagen!', classes: 'rounded red toast-mobile', displayLength: 1000 })
          this.setState({ imageLoaded: false, loading: false })
        })
    }, false)
  }

  render() {
    return (

      <div className="row">
        <div className="row">
          <div className="col s12 l6 push-l3 file-field">
            <div className="col s4 img_botella modify-contenedor">
              <div className="btn waves-light modify-btn pink darken-1">
                <i className="small material-icons">create</i>
                <input type="file" id="imagen" />
              </div>

              <div className={`preloader-wrapper preloader-big ${this.state.loading ? '' : 'hide'} active left`} >
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>

              <img src={this.state.botella.imgPath} alt="botella_img" className="responsive-img" />
            </div>
            <h5 className="col s8" style={{ marginTop: 60 }}>Modificar Botella</h5>
          </div>
        </div>
        <form className="col s12 l6 push-l3" onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
          <div className="row">
            <div className="input-field col s6">
              <input id="nombre" type="text" className="validate" onChange={this.handleChange} value={this.state.botella.nombre} required />
              <label htmlFor="nombre">Nombre</label>
            </div>
            <div className="input-field col s6">
              <input id="marca" type="text" className="validate" onChange={this.handleChange} value={this.state.botella.marca} required />
              <label htmlFor="marca">Marca</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="grado" placeholder="0 si no contiene alcohol" type="text" className="validate" onChange={this.handleChange} value={this.state.botella.grado} required />
              <label htmlFor="grado">Grado alcohólico</label>
            </div>
            <div className="input-field col s6">
              <input id="ml" type="text" className="validate" onChange={this.handleChange} value={this.state.botella.ml} required />
              <label htmlFor="ml">¿Cuántos ml tiene?</label>
            </div>
          </div>

          {/* <div className="row">
            <div className="file-field col s12 input-field">
              <div className="btn waves-light col s12 l3">
                <span>subir imagen</span>
                <input type="file" id="imagen" />
              </div>

              <div className="file-path-wrapper col s7 hide-on-small-only">
                <input className="file-path validate" type="text" />
              </div>

              

            </div>
          </div> */}

          <button className="btn waves-effect">modificar</button>
        </form>
      </div>

    )
  }

}