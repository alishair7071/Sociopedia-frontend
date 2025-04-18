import { uploadImage } from "./utills/uploadImage";

//upload images by calling a function 'uploadImage' that is in separate file
const callUploadFunc = async (file) => {
  let imageUrlFromSupabase;

  console.log("upload func is called and it is going to call the original");

  const result = await uploadImage(file);
  console.log("result: "+result);
  if (result.error) {
    alert("Upload failed: " + result.error);
  } else {
    imageUrlFromSupabase = result.publicData.publicUrl;
    console.log("url of image: "+imageUrlFromSupabase);
    return imageUrlFromSupabase;

  }
};

export default callUploadFunc;
