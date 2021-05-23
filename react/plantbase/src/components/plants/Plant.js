import { Link } from 'react-router-dom';
import EditPlant from './EditPlant';

function Plant({plants = [], plant, editPlant}) {
    const plantStyle = {
        'width': '18rem',
        'marginBottom': '10px',
        'marginLeft': '30px',
        'marginTop': '30px',
        'textDecoration': 'none'
    };

    const navStyle = {
        color: 'green',
        'textDecoration': 'none'
    };

    // const editForm = (plant) => {
    //     return (
    //         <EditPlant editPlant={editPlant}/>
    //     );
    // }

    return (
    <div className="" style={plantStyle}>
        <Link to={`/plantprofile/${plant.plantId}`} style={navStyle}>
            <div className="card bg-light mt-3" key={plant.plantId} >
                <div  className="col">
                <span className="badge bg-success">{plant.plantId}</span>
                </div>
                <div className="col"><strong>{plant.plantName}</strong></div>
                <div className="col">{plant.plantType}</div>
                {/* <td className="col">{plant.gotchaDate}</td> */}
                <div className="col"><img src={plant.photo} style={{ alignSelf: 'center', marginBottom: '10px', marginTop: '10px' }} alt="plant list item" width="200px"></img></div>
                {/* <td className="col">{plant.plantDescription}</td> */}
                {/* <td className="col"><button type="button" className="btn btn-success" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit an Agent" onClick={editForm(plant)}>Edit</button></td> */}
                <div className="col"></div>
            </div>
        </Link>
    </div>
    );
}

export default Plant;