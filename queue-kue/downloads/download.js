const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')
const moment = require('moment');

async function downloadImage (url) {
  const path = Path.resolve(__dirname, '../downloads', moment().format('YYYY-MM-dd:mmssa'))

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream',
    onDownloadProgress: function (e) {
      console.log("This just in... ", e);
    }
  })

  console.log("call function download");
  // pipe the result stream into a file on disc
  response.data.pipe(Fs.createWriteStream(path))
  
  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log('download end');
      resolve()
    })

    response.data.on('error', () => {
      console.log('download error');
      reject()
    })
  })

}