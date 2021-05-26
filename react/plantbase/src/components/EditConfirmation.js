import { useHistory } from "react-router-dom";

function EditConfirmation() {
  const history = useHistory();

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage:
          "url(https://media.istockphoto.com/vectors/horizontal-vector-illustration-of-an-empty-light-smoky-blue-gray-vector-id1177688756?b=1&k=6&m=1177688756&s=170667a&w=0&h=t3dpwnpMAT4jWgrrRbd47Umv4y-XI7mVUPtKzux5p04=)",
        height: "1120px auto",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container w-50 p-3">
        <div className="card text-center text-white mt-3" style={{backgroundColor: 'rgba(133, 166, 141, 1)', fontFamily: 'Century Gothic'}}>
          <h1 className="card-header">Edit Status:</h1>
          <div className="card-body">
            <h2 className="card-text">Success ✅</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditConfirmation;
