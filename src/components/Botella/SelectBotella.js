import React, { Component } from 'react'
import * as firebase from 'firebase'
import M from 'materialize-css'
import Options from '../Options'

export default class SelectBotella extends Component {
  constructor() {
    super()
    this.state = {
      botellas: []
    }

    this.refBotellas = firebase.database().ref().child('botella')
  }

  async componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select')
      var instances = M.FormSelect.init(elems)
    })

    await this.refBotellas.on('value', snap => {
      const botellas = []
      snap.forEach(row => {
        botellas.push({ ...row.val() })
      })
      this.setState({ botellas })
    })
  }

  render() {
    const { botellas } = this.state
    let options

    options = (
      <select className="icons" defaultValue="default">
        <option value="default" disabled>select</option>
        {botellas.map(botella => (
          <Options key={botella.imgPath} value="" botella={botella} />
        ))}
      </select>
    )

    return options

    // let select;
    // if (loading) {
    //   taskList = <div className="TaskList-empty">Loading...</div>;
    // } else if (tasks.length) {
    //   taskList = (
    //     <ul className="TaskList">
    //       {orderedTasks.map(task => (
    //         <TaskListItem key={task.key} task={task} />
    //       ))}
    //     </ul>
    //   );
    // } else {
    //   taskList = <div className="TaskList-empty">No Tasks</div>;
    // }

    // return taskList;
  }
}