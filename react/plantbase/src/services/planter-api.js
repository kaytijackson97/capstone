export async function findPlanterByUsername(username) {
    const response = await fetch(`http://localhost:8080/api/planter/${username}`);

    if (response.status === 404) {
        return null;
    }
    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

