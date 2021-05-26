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
            <div className="row">
            <h2 className="col" style={{color: 'rgba(89, 107, 93, 1)', fontFamily: 'Century Gothic', marginLeft: '40%', maxWidth: '13%'}}>Plant List 
                </h2>
                <div className="col">
                <AddPlant plants={plants} setPlants={setPlants} setShowAddForm={setShowAddForm} myGardenId={myGardenId}/>
                </div>
            </div>
                <div className="row text-center">
                {plants.map(p => (<Plant key={p.plantId} plants={plants} plant={p} myGardenId={myGardenId}/> ))}
                </div>
            </div>
        </div>
    );
}

export default PlantList;