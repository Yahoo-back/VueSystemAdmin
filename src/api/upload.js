import axios from 'axios';

function uploadfile(file,options={}) {
    // let filename=file.name
    // let filesize=file.size
    // let type=filename.substr(filename.indexOf('.')+1).toLowerCase();
    let formdata=new FormData();
    formdata.append('file',file);

const token=sessionStorage.getItem('token')
axios.request({
    url: 'http://localhost:8003/main/upload',
    method:'post',
    params:{
        // Authorization:token
    },
    data:formdata,
    headers:{
      'Content-Type':'multipart/form-data',
      'Authorization':token
    },
  })
  .then((res)=>{
    let data=res.data
    // console.log(data)
    if(data.code == 200) {
      options.success&&options.success(data.data.picPath)
      return true
    }else {
      options.fail&&options.fail(data.message)
      return false
    }

    // if(options.token){
    //   options.success&&options.success(data['host']+data['key'])
    //   return true
    // }else {
    //   if(data.code=='1'){
    //     options.success&&options.success(data.data.filename)
    //     return true
    //   }else {
    //     options.fail&&options.fail(data.msg)
    //     return false
    //   }
    // }

  }).catch((err)=>{
    // options.fail&&options.fail(err)
    return false
  })
}
  export const upload=uploadfile
