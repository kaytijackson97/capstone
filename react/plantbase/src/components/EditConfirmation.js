import { useHistory } from "react-router-dom";

function EditConfirmation() {
  const history = useHistory();

  return (
<div className="container w-50 p-3">
<div className="card text-center text-white bg-success mt-3">
  <h1 className="card-header">Edit Status:</h1>
  <div className="card-body">
    <h2 className="card-text">Success ✅</h2>
  </div>
</div>
</div>
  );
}

export default EditConfirmation;