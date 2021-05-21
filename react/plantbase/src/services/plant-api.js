export async function findAllPlants() {
    const response = await fetch("http://localhost:8080/api/plants");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPlantById(plantId) {
    const response = await fetch(`http://localhost:8080/api/plants/${plantId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPlantsByMyGardenId(myGardenId) {
    const response = await fetch(`http://localhost:8080/api/post/plant/${myGardenId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function addPlant(plant) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(plant)
    };
    await fetch("http://localhost:8080/api/plants", init)
    .then(response => {
        if (response !== 201) {
            return Promise.reject("response is not 201 CREATED");
        } else {
            return response.json();
        }
    });
    // .then(() => { 
    //     history.push(setMessages("Confirmation ✅ - Agent edited successfully 👍🏻"));
    //   })
    //     .catch(() => {
    //       history.push(setMessages("Error - Agent was not edited 👎🏻"));
    //     })
    //   .catch(console.log);
}