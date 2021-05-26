// import { useContext } from 'react';
// import CurrentUser from '../components/contexts/CurrentUser';


// const auth = useContext(CurrentUser);

export async function findAllPlants() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/plants`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPlantById(plantId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/plants/${plantId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPlantsByMyGardenId(myGardenId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/plants/byMyGarden/${myGardenId}`);

    if (response.status === 404) {
        return [];
    }
    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}