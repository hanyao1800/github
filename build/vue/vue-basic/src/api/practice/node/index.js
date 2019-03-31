import request from "@/utils/request"

const queryApi = {};

queryApi.getListData = () => {

   
   return  request.post("/node/practice/table/node/querylist");

}

queryApi.getMapTitle = (type = 1818940751,zoom = 12,x = 3449,y = 1529) => {


    const data = {

        type,
        zoom,
        x,
        y

    }

   
    return  request.get(`/node/practice/table/node/getMaptitle?type=${type}&zoom=${zoom}&x=${x}&y=${y}`);
 
 }



queryApi.fileUpload = (formData) => {

   
    return  request.post("/node/practice/table/node/fileUpload",formData,{ headers: { 'Content-Type': 'multipart/form-data' }});
 
 }
 
 


export default queryApi;