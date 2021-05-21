function Messages({messages}) {
    // const auth = useContext(CurrentUser);
      return (
        <div className="alert alert-success mt-2">
          <h4 className="alert-heading text-center">Messages</h4>
          <div className="card-body text-center">
              {messages}
              {/* {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
                ""
              ) : ( */}
                Howdy
               {/* )} */}
          </div>
        </div>
      );
    }
    
    export default Messages;