import Plant from './Plant';
import AddPlant from './AddPlant';
import { useState, useContext } from 'react';
import CurrentUser from '../contexts/CurrentUser';

function PlantList({plants = [], setPlants, myGardenId }) {
    const auth = useContext(CurrentUser);
    const [showAddForm, setShowAddForm] = useState(false);


    return (
        <div>
            <div>
                <h2 className="text-center" style={{color: 'white', fontFamily: 'Century Gothic'}}>Plant List</h2>
                <div className="row text-center">
                <AddPlant plants={plants} setPlants={setPlants} setShowAddForm={setShowAddForm} myGardenId={myGardenId}/>
                {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p} myGardenId={myGardenId}/> ))}
                </div>
            </div>
        </div>
    );
}

export default PlantList;