import Plant from './Plant';

function PlantList({plants = [], editPlant}) {
    return (
        <div className="container">
            <div className="card text-white mt-3 text-center">
            <h2 className="card-header bg-success card-title">Plant List</h2>
            
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