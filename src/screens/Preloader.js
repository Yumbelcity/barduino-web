import React from 'react'

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-small preloader-wrapper big active">
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
      {/* <div className="progress">
        <div className="indeterminate"></div>
      </div> */}
    </div>
  )
}