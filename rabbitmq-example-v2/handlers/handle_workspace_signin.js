const handleWorkspaceSignin = async (payload, ack) => {
    try {
        const callback = payload.content.toString();
        
        //handle logic here
        setTimeout(() => {
          console.log(callback);
        }, 100000);

        ack();
    } catch (error) {
        console.error(error);
    }
  }

module.exports = handleWorkspaceSignin;