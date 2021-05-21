import Plant from './Plant';

function PlantList({plants = [], editPlant}) {
    const navStyle = {
        color: 'green',
        'text-decoration': 'none'
    };

    return (
        <div className="container">
            <div className="card bg-success mt-3 text-center">
            <h2 className="card-header bg-light card-title" style={navStyle}>Plant List</h2>
            
            <table className="table text-center"  margin="20px 0px 100px 10px">
                <div className="row text-center" >
                    {plants.map(p => (
                        <Plant key={p.plantId} plants={plants} plant={p} editPlant={editPlant}/>
                    ))}
                </div>
            </table>
            <div>
            </div>
        </div>
        </div>
    );
}

export default PlantList;