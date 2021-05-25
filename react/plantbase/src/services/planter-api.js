export async function findPlanterByUsername(username) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/planter/${username}`);

    if (response.status === 404) {
        return null;
    }
    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

