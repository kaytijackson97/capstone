export async function findUserById(userId) {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}
