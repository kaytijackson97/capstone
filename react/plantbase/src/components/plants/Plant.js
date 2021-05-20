import { Link } from 'react-router-dom';

function Plant({plants = [], plant, editPlant}) {
    const plantStyle = {
        'width': '18rem',
        'margin-bottom': '10px',
        'margin-left': '30px',
        'margin-top': '30px',
        'text-decoration': 'none'
    };

    const navStyle = {
        color: 'green',
        'text-decoration': 'none'
    };

    return (
    <div className="" style={plantStyle}>
        <Link to={`/plantprofile/${plant.plantId}`} style={navStyle}>
            <div className="card " key={plant.plantId} >
                <td  className="col">
                <span className="badge bg-success ">{plant.plantId}</span>
                </td>
                <td className="col">{plant.plantName}</td>
                <td className="col">{plant.plantType}</td>
                {/* <td className="col">{plant.gotchaDate}</td> */}
                <td className="col"><img src="{plant.photo}" style={{ alignSelf: 'center' }} alt="plant list item" width="20px"></img></td>
                {/* <td className="col">{plant.plantDescription}</td> */}
                {/* <td className="col"><button type="button" className="btn btn-success" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit an Agent" onClick={() => approvedEditForm()}>Edit</button></td> */}
                <td className="col"></td>
            </div>
        </Link>
    </div>
    );
}

export default Plant;