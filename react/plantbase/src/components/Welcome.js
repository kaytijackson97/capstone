// import './redcup-plant.png';

function Welcome() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card text-white bg-success mt-3">
                        <h1 className="card-header">Welcome to Plantbase.</h1>
                        <p className="card-body">A safe space for the plant community.</p>
                        {/* <img src="redcup-plant.png" alt="redcup plant"></img> */}
                    </div>
                </div>
                <div className="col">
                    <div className="card border-success mb-3" style={{maxwidth: + 20}}>
                        <div className="card-header">Header</div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                       
                    </div>

                </div>

                    
            </div>
        </div>
    );
}

export default Welcome;