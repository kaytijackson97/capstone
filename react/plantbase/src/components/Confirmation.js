import { useHistory } from "react-router-dom";

function Confirmation() {
  const history = useHistory();
  console.log(history.location.state.msg);

  return (
<div className="container w-50 p-3">
<div className="card text-center text-white bg-success mt-3">
  <h1 className="card-header">Logout Status:</h1>
  <div className="card-body">
    <h2 className="card-text">Confirmation ✅ - {history.location.state.msg}</h2>
  </div>
</div>
</div>
  );
}

export default Confirmation;