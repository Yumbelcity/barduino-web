import React, { Component } from 'react'
import M from 'materialize-css'
import SelectBotella from '../../components/Botella/SelectBotella'
import orderBy from 'lodash/orderBy'
import Options from '../../components/Options'

//Firebase
import * as firebase from 'firebase'

export default class ScreenCrearTrago extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trago: {
        nombre: '',
        _idBotellaUno: '',
        _idBotellaDos: '',
        precio: '',
        imgPath: ''
      },
      botellas: [],
      imageLoaded: false,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    if (e.target.id === 'nombre') {
      let trago = this.state.trago
      this.setState({
        trago: Object.assign({}, trago, {
          nombre: e.target.value
        })
      })
    }
    if (e.target.id === 'precio') {
      let trago = this.state.trago
      this.setState({
        trago: Object.assign({}, trago, {
          precio: e.target.value
        })
      })
    }
  }

  selectedOne = (id, nombre, marca, grado) => {
    let trago = this.state.trago
    this.setState({
      trago: Object.assign({}, trago, {
        _idBotellaUno: id
      })
    })
    const botella = `${nombre} ${marca} ${grado !== 0 ? (grado + 'º') : ''}`
    document.getElementById('drop1').innerHTML = botella
  }

  selectedTwo = (id, nombre, marca, grado) => {
    let trago = this.state.trago
    this.setState({
      trago: Object.assign({}, trago, {
        _idBotellaDos: id
      })
    })
    const botella = `${nombre} ${marca} ${grado !== 0 ? (grado + 'º') : ''}`
    document.getElementById('drop2').innerHTML = botella
  }

  async handleSubmit(e) {
    e.preventDefault()
    if (this.state.imageLoaded) {
      let data = {}
      const key = firebase.database().ref().child('trago').push().key
      data[key] = this.state.trago
      await firebase.database().ref().child('trago').update(data)
        .then(() => {
          M.toast({ html: 'Trago ingresado!', classes: 'rounded green toast-mobile', displayLength: 1000 })
        })
        .catch(err => {
          alert(err.message)
        })
    } else {
      M.toast({ html: 'Debes subir una fotografía del trago que estás ingresando', classes: 'rounded red toast-mobile', displayLength: 2000 })
    }
  }

  async componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      let elems = document.querySelectorAll('.dropdown-trigger')
      let instances = M.Dropdown.init(elems)
    })

    await firebase.database().ref().child('botella').on('value', snapshot => {
      let botellas = []
      snapshot.forEach(row => {
        botellas.push({ ...row.val(), key: row.key })
      })
      this.setState({ botellas })
    })


    let image = document.getElementById('imagen')
    image.addEventListener('change', () => {
      this.setState({
        loading: true
      })
      let imagenASubir = image.files[0]
      const storageRef = firebase.storage().ref()
      const uploadRef = storageRef.child(`tragos/${imagenASubir.name}`)
      const uploadTask = uploadRef.put(imagenASubir)
        .then(snapshot => {
          uploadRef.getDownloadURL()
            .then(url => {
              let trago = this.state.trago
              this.setState({
                trago: Object.assign({}, trago, {
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
    const { trago, botellas } = this.state

    const orderedBotellas = orderBy(
      botellas,
      ['asc', 'desc']
    )

    let optionsOne = (
      orderedBotellas.map(botella => (
        <Options key={botella.key} botella={botella} selected={this.selectedOne} />
      ))
    )

    let optionsTwo = (
      orderedBotellas.map(botella => (
        <Options key={botella.key} botella={botella} selected={this.selectedTwo} />
      ))
    )

    return (

      <div className="row">
        <h5 style={{ marginTop: 40 }}>Crear un nuevo Trago</h5>
        <form className="col s12 l6 push-l3" onSubmit={this.handleSubmit} style={{ marginTop: 30 }}>
          <div className="row">
            <div className="input-field col s6">
              <input id="nombre" type="text" className="validate" onChange={this.handleChange} value={trago.nombre} required />
              <label htmlFor="nombre">Nombre</label>
            </div>
            <div className="input-field col s6">
              <input id="precio" type="text" className="validate" onChange={this.handleChange} value={trago.precio} required />
              <label htmlFor="precio">Precio</label>
            </div>
          </div>

          {/* SELECCIONAR BOTELLA */}

          <div className="row">
            <div className="left input-field col s12">
              <a href="" id="drop1" className="dropdown-trigger btn col s12 pink darken-1" data-target='dropdown1'>Seleccionar Botella 1</a>
              <ul id="dropdown1" className="dropdown-content">
                {optionsOne}
              </ul>
              <span className="left helper-text">(esta botella debe ser la más costosa de las 2)</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <a href="" id="drop2" className="dropdown-trigger btn col s12 pink darken-1" data-target='dropdown2'>Seleccionar Botella 2</a>
              <ul id="dropdown2" className="dropdown-content">
                {optionsTwo}
              </ul>
            </div>
          </div>

          {/* SUBIR IMAGEN */}

          <div className="row">
            <div className="file-field col s12 input-field">
              <div className="btn waves-light col s12 l3 pink darken-1">
                <span>subir imagen</span>
                <input type="file" id="imagen" />
              </div>

              <div className="file-path-wrapper col s7 hide-on-small-only">
                <input className="file-path validate" type="text" />
                <span className="left helper-text">Foto presentación del trago</span>
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

          <button className="btn waves-effect">Crear</button>
        </form>
      </div>

    )
  }

}