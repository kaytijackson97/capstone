import { useEffect } from "react";

function Post() {
    useEffect(() => {

    },[]);
    //Post needs:
    // Username
    // plant name
    // caption
    // photo
    // datetime posted
    // like button
    // replies
    return(
        <div class="card bg-light mb-3" style={{maxwidth: + 20}}>
            <div class="card-header">Header</div>
            <div class="card-body">
                <h4 class="card-title">Light card title</h4>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    );
}

export default Post;