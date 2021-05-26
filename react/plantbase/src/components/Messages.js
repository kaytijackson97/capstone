function Messages({messages}) {
    // const auth = useContext(CurrentUser);
      return (
        <div className="alert mt-2" style={{fontFamily: 'Century Gothic', backgroundColor: 'rgba(133, 166, 141, 0.7)'}}>
          <h4 className="alert-heading text-center">Messages</h4>
          <div className="card-body text-center">
              {messages}
              {/* {auth.currentUser && auth.currentUser.hasRole("ADMIN") ? (
                ""
              ) : ( */}
                What did the boy plant say to his girlfriend? 

                “I’ll never leaf you.”
               {/* )} */}
          </div>
        </div>
      );
    }
    
    export default Messages;