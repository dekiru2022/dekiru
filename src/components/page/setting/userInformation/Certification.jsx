//https://qiita.com/kazama1209/items/7261126696d9841302cd
//プリンシパル設定：https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_elements_principal.html
//バケットについて：https://recipe.kc-cloud.jp/archives/783
//S3バケットにアクセスするための権限設定：https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#manual-setup-import-storage-bucket

//https://www.aizulab.com/blog/react-image-crop/

import Amplify from 'aws-amplify';
import aws_exports from '../../../../aws-exports';
import { Storage, Auth, Hub } from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';

import ReactCrop from 'react-image-crop';

import { Button } from '@mui/material';

Amplify.configure(aws_exports);

function Certification() {
  // console.log("useState")
  const [url, setUrl] = useState("");
  const [cognitoUserID, setCognitoUserID] = useState();
  const [src, setSrc] = useState();
  const [files, setFiles] = useState();

  useEffect(() => {
    getDataAws()
  }, [])

  async function getDataAws() {
    let user1 = await Auth.currentAuthenticatedUser();
    let cognitoID = user1.attributes.sub;
    setCognitoUserID(cognitoID);

    setSrc(`https://mydreams769891ee61d8400295a4455b85879f9f123131-develop.s3.ap-northeast-1.amazonaws.com/public/${cognitoID}/ProfileImage/public.png`);
    console.log(src);
  }
  async function onChange(e) {
    setFiles(e.target.files[0])
  }
  async function onClick(e) {

    const fileData = files.name.split('.');
    const fileExtension = fileData[fileData.length - 1];

    try {
      await Storage.put(`${cognitoUserID}/ProfileImage/public.${fileExtension}`, files, {
        contentType: "image/png", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <>
      {/* <AmplifyS3Image imgKey={`${cognitoId}/ProfileImage/2022-02-14_21.12.13.png`} /> */}
      {/* <AmplifyS3ImagePicker trace /> */}

      <input type="file" accept="image/*" onChange={onChange} />
      {src && <img style={{ maxWidth: '100%' }} src={src} />}
      <Button
        style={{
          // ボタン
          width: 'auto',
          height: 'auto',

          // テキスト
          color: '#FFF',
          fontSize: '1.5rem',
          borderRadius: 20,
        }}
        className="style-button"
        variant="contained"
        onClick={onClick} >アップロードする
      </Button>
    </>
  );
}
export default Certification