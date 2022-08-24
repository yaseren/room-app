import Room from "./components/Room/Room"

const App = ()=>{
    return (
        <div className="page-content">
              <Room server='wss://media.setup-infra.ir'  room='1004'  />
        <div className="join-call">
            <div className="join-video">
                
                <div className="video-avatar">
                    <h4>Camera is off</h4>
                </div>
                <div className="call-icons">
                    <ul className="call-items">
                        <li className="call-item">
                            <a className="mute-bt" href="#" title="" data-bs-placement="top" data-bs-toggle="tooltip" data-bs-original-title="Mute Audio">
<i className="feather-mic"></i>
</a>
                        </li>
                        <li className="call-item">
                            <a className="mute-video" href="#" title="" data-bs-placement="top" data-bs-toggle="tooltip" data-bs-original-title="Stop Camera">
<i className="feather-video"></i>
</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="join-content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-control-label">What's your name?</label>
                            <input type="text" className="form-control" placeholder="Enter Your Name here"/>
                        </div>
                    </div>
                </div>
                <h3>UX/UI Design Conference Meeting</h3>
                <div className="btn-infos">
                    <a href="meetingcall-horizontal.html" className="btn btn-primary btn-join">Join Now</a>
                    <div className="d-flex align-items-center">
                        <span className="icon-mic"><i className="feather-mic"></i></span> <span>Your microphone is working properly</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
   }

export default App