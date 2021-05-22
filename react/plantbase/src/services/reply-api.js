export async function findAllReplies() {
    const response = await fetch("http://localhost:8080/api/reply");

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findRepliesByPost(postId) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${postId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function findReplyById(replyId) {
    const response = await fetch(`http://localhost:8080/api/reply/post/${replyId}`);

    if (response.status !== 200) {
        return Promise.reject("response is not 200 OK");
    }

    return response.json();
}

export async function addReply(reply) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reply),
        };

    const response = await fetch("http://localhost:8080/api/reply", init);

    if (response.status !== 201) {
        return Promise.reject("response is not 201 CREATED");
    }
}

export async function deleteReplyById(replyId) {
    const response = await fetch(`http://localhost:8080/api/reply/${replyId}`, {method: "DELETE"});

    if (response.status !== 204) {
        return Promise.reject("response is not 204 NO_CONTENT");
    }
}