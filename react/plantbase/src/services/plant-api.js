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

// //add plant fetch
// const addPlant = (plant) => {
//     const init = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": `Bearer ${auth.token}`
//         },
//         body: JSON.stringify(plant)
//     };
//     fetch(`${process.env.REACT_APP_API_URL}/api/plants`, init)
//     .then(response => {
//         if (response.status !== 201) {
//             return Promise.reject("response is not 201 CREATED.");
//         }
//         return response.json();
//         })
//         .then(json => setPlants([...plants, json]))
//         .then(() => {
//             history.push(`/my-garden/${auth.currentUser.userId}`);
//         })
//         .catch(console.log);
// }