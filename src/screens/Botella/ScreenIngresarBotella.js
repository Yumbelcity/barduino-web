import React, { Component } from 'react'
import M from 'materialize-css'

//Firebase
import * as firebase from 'firebase'

export default class ScreenIngresarBotella extends Component {
  constructor(props) {
    super(props)
    this.state = {
      botella: {
        nombre: '',
        marca: '',
        grado: '',
        ml: '',
        imgPath: ''
      },
      imageLoaded: false,
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
      const key = firebase.database().ref().child('botella').push().key
      data[key] = this.state.botella
      await firebase.database().ref().child('botella').update(data)
        .then(() => {
          M.toast({ html: 'Botella ingresada!', classes: 'rounded green toast-mobile', displayLength: 1000 })
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
      this.setState({
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
      // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      //   null,
      //   err => alert(err.message),
      //   snapshot => alert()
      // )
    }, false)
  }

  render() {
    return (

      <div className="row">
        <h5 style={{ marginTop: 40 }}>Ingresar una Botella</h5>
        <form className="col s12 l6 push-l3" onSubmit={this.handleSubmit} style={{ marginTop: 30 }}>
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

          <div className="row">
            <div className="file-field col s12 input-field">
              <div className="btn waves-light col s12 l3 pink darken-1">
                <span>subir imagen</span>
                <input type="file" id="imagen" />
              </div>

              <div className="file-path-wrapper col s7 hide-on-small-only">
                <input className="file-path validate" type="text" />
              </div>

              <div className={`preloader-small preloader-wrapper small ${this.state.loading ? '' : 'hide'} active left`} >
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

            </div>
          </div>

          <button className="btn waves-effect">ingresar</button>
        </form>
      </div>

    )
  }

}