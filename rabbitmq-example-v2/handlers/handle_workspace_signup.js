const handleWorkspaceSignup = async (payload, ack) => {
    try {
        const callback = payload.content.toString();

        // setTimeout(() => {
        //   console.log(callback);
        // }, 12000);
        console.log(callback);
  
        ack();
    } catch (error) {
        console.error(error);
    }
  }

module.exports = handleWorkspaceSignup;