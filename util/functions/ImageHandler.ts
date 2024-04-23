import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

const imageHandler = async (path: string, fileUrl: string | null, fileName: string) => {
  if(path === ""){
    throw Error('Missing path.')
  }
  if(fileUrl === "" || !fileUrl){
    throw Error('Missing file url.')
  }
  if(fileName === ""){
    throw Error('Missing file name.')
  }
  try {
    const response = await fetch(fileUrl!);
    const blob = await response.blob();
  
    const imageRef = ref(storage, path + fileName);
    const snapshot = await uploadBytesResumable(imageRef, blob)
      
    const url = await getDownloadURL(snapshot.ref)

    return url;

  } catch (error) {
    throw error;
  }
}

export default imageHandler;