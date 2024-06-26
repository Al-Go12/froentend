import axios from "axios"
import { BASE_URL } from '../constant/api_url'

const UpdatePostApi = async (postId,content, postImage,fetchData) => {
  try{
    console.log('conent',content,postId)
    const accessToken = localStorage.getItem('access');
    
    const formData =new FormData();
    if(content) formData.append('body',content);
   
    if(postImage) formData.append('img',postImage);
    
    const response = await axios.post(`${BASE_URL}/api/post/update-post/${postId}/`,formData,{
      headers:{
          Accept:'application/json',
          Authorization:`Bearer ${accessToken}`,
      },
    });

    if(response.status === 200){
      console.log('updated sucessfully');
      if(fetchData){
        fetchData();
      }
    }
    else{
      console.log(response.error);
    }
  }
catch(error){
  console.error(error);
}
}
export default UpdatePostApi
