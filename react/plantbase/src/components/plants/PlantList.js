import Plant from './Plant';
import AddPlant from './AddPlant';

function PlantList({plants = [], setPlants, myGardenId, editPlantByPlantId }) {
    return (
        <div>
            <div>
            <div className="row">
            <h2 className="text-center d-inline" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic', maxWidth: 'auto'}}>Plant List 
            <div className="d-inline">
                <AddPlant plants={plants} setPlants={setPlants} myGardenId={myGardenId}/>
            </div>
            </h2>
                
            </div>
                <div className="row text-center">
                {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p} myGardenId={myGardenId} editPlantByPlantId={editPlantByPlantId}/> ))}
                </div>
            </div>
        </div>
    );
}

export default PlantList;