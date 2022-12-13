const RMQConsumer = require('./')

async function processUploads() {
    try {
      const consumer = await RMQConsumer;
      await consumer.createEx({
        name: EXCHANGE,
        type: "direct",
      });
      consumer.subscribe(
        { exchange: "upload", bindingKey: "image" },
        handleImage
      );
    } catch (error) {
      console.log(error);
    }
  }
  
  processUploads();