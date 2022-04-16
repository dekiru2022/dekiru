//https://qiita.com/kazama1209/items/7261126696d9841302cd
//プリンシパル設定：https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_elements_principal.html
//バケットについて：https://recipe.kc-cloud.jp/archives/783
//S3バケットにアクセスするための権限設定：https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#manual-setup-import-storage-bucket

//https://www.aizulab.com/blog/react-image-crop/
//https://morioh.com/p/8f3de63a3303
import Amplify from 'aws-amplify';
import aws_exports from '../../../../aws-exports';
import { Storage, Auth, Hub } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@mui/material';

Amplify.configure(aws_exports);

function Certification() {
  // console.log("useState")

  const [cognitoUserID, setCognitoUserID] = useState();
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getDataAws()
  }, []);

  useEffect(() => {
    const images = [], fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result)
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        }
        fileReader.readAsDataURL(file);
      })
    };
    return () => {
      isCancel = true;
      fileReaders.forEach(fileReader => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles]);

  async function getDataAws() {
    let user1 = await Auth.currentAuthenticatedUser();
    let cognitoID = user1.attributes.sub;
    setCognitoUserID(cognitoID);
  }

  async function onChange(e) {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  }

  async function onClick(e) {

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const fileData = file.name.split('.');
      const fileExtension = fileData[fileData.length - 1];

      if (file.type.match(imageTypeRegex)) {
        try {
          await Storage.put(`${cognitoUserID}/ProfileImage/private${i}.${fileExtension}`, file, {
            contentType: "image/jpeg", // contentType is optional
          });
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      }
    }
  }

  return (
    <>
      <input type="file" accept='.png, .jpg, .jpeg' onChange={(e) => onChange(e)} multiple />
      {
        images.length > 0 ?
          <div>
            {
              images.map((image, idx) => {
                return <p key={idx}> <img src={image} style={{ maxWidth: '50%' }} /> </p>
              })
            }
          </div> : null
      }

      <Button
        variant="contained"
        onClick={onClick} >アップロードする
      </Button>
    </>
  );
}

export default Certification