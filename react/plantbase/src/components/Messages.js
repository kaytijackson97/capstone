function Messages({messages}) {
      return (
        <div className="alert mt-3" style={{fontFamily: 'Century Gothic', backgroundColor: 'rgba(133, 166, 141, 0.7)'}}>
          <h4 className="alert-heading text-center">Messages</h4>
          <div className="card-body text-center">
              {messages}
                What did the boy plant say to his girlfriend? 

                “I’ll never leaf you.”
          </div>
        </div>
      );
    }
    
    export default Messages;