import React, { Component } from 'react'
import M from 'materialize-css'
import logo from './img/barduino_logo.png'
import './App.css'
import Preloader from './screens/Preloader'
import ScreenCrearTrago from './screens/Tragos/ScreenCrearTrago'
import ScreenIngresarBotella from './screens/Botella/ScreenIngresarBotella'
import ScreenModificarBotella from './screens/Botella/ScreenModificarBotella'
//Firebase
import firebaseConfig from './utils/Firebase'
import * as firebase from 'firebase'
firebase.initializeApp(firebaseConfig)

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      pedidos: [],
      loaded: false,
      menu: 'modificar'
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
    // firebase.database().ref().child('pedido')
    //   .on('value', snapshot => {
    //     const pedidos = [];
    //     snapshot.forEach(row => {
    //       pedidos.push({ ...row.val(), key: row.key });
    //     });
    //     this.setState({ pedidos, loaded: true });
    //   });
  }

  handledMenu(menu) {
    this.setState({ menu })
  }

  render() {
    const { menu } = this.state
    return (
      <div className='App'>
        {/* <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Administración Barduino</h1>
        </header> */}
        <nav className=" pink darken-">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">
              <img src={logo} className='left App-logo hide-on-small-only' alt='logo' />
              <h1 className='left flow-text hide-on-small-only col s12'>Administración Barduino</h1>
              <h1 className='right flow-text hide-on-med-and-up'>Administración Barduino</h1>
            </a>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="" onClick={() => this.handledMenu("crear")}>Crear Trago</a></li>
              <li><a href="" onClick={() => this.handledMenu("modificar")}>Modificar Botella</a></li>
              <li><a href="" onClick={() => this.handledMenu("ingresar")}>Ingresar Botella</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li><a href="" onClick={() => this.handledMenu("crear")}>Crear Trago</a></li>
          <li><a href="" onClick={() => this.handledMenu("modificar")}>Modificar Botella</a></li>
          <li><a href="" onClick={() => this.handledMenu("ingresar")}>Ingresar Botella</a></li>
        </ul>
        {/* {
          this.state.loaded
            ? <p className='App-intro'>Aquí debería cargar los pedidos...</p>
            : <Preloader />
        }
        {console.log(pedidos)} */}


        {/* <div className="row">
          <div className="col s3 teal lighten-2 mi-menu">
            <a href="" onClick={() => this.handledMenu("crear")}>Crear Trago</a>
            <a href="" onClick={() => this.handledMenu("modificar")}>Modificar Trago</a>
            <a href="" onClick={() => this.handledMenu("ingresar")}>Ingresar Botella</a>
          </div> */}

        <div>
          {menu === 'crear' ? <ScreenCrearTrago /> : ''}
          {menu === 'modificar' ? <ScreenModificarBotella /> : ''}
          {menu === 'ingresar' ? <ScreenIngresarBotella /> : ''}
        </div>
        {/* </div> */}

      </div>
    )
  }
}