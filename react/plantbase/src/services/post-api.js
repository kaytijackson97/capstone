export async function findAllPosts() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post`)

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByUsername(username) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/planter/${username}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostByPlantId(plantId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/plant/${plantId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findPostById(postId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/post/${postId}`);
    
    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}