export async function findPlanterById(planterId) {
    const response = await fetch(`http://localhost:8080/api/planter/${planterId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}
