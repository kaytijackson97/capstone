import Plant from './Plant';
import AddPlant from './AddPlant';

function PlantList({plants = [], setPlants, myGardenId, editPlantByPlantId }) {
    return (
        <div>
            <div>
            <div className="row">
            <h2 className="col" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic', marginLeft: '40%', maxWidth: '13%'}}>Plant List 
                </h2>
                <div className="col">
                <AddPlant plants={plants} setPlants={setPlants} myGardenId={myGardenId}/>
                </div>
            </div>
                <div className="row text-center">
                {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p} myGardenId={myGardenId} editPlantByPlantId={editPlantByPlantId}/> ))}
                </div>
            </div>
        </div>
    );
}

export default PlantList;