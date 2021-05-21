function AddPost() {
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();


    }

    const postStyle = {
        "width": "1000px"
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card bg-light mt-3" style={postStyle}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" size="850px" placeholder="Show off your plant!"></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Add photo url"></input>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button type="submit" className="btn btn-success">Add Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPost;