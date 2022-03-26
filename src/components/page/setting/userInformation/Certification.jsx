//https://qiita.com/kazama1209/items/7261126696d9841302cd
//プリンシパル設定：https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/reference_policies_elements_principal.html
//バケットについて：https://recipe.kc-cloud.jp/archives/783
//S3バケットにアクセスするための権限設定：https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#manual-setup-import-storage-bucket

import Amplify from 'aws-amplify';
import aws_exports from '../../../../aws-exports';
import { Storage, Auth , Hub} from 'aws-amplify';
import { AmplifyS3Image } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';
import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';

Amplify.configure(aws_exports);

function Certification() {
    // console.log("useState")
    const [cognitoId, setCognitoId] = useState();

    useEffect(() => {
        Hub.listen("storage", (data) => console.log(data))
        Hub.listen("storage", ({ payload }) => {
          if (payload.event === "upload" && payload.message) {
            const imageKey = payload.message.replace("Upload success for ", "")
            if (payload.data.attrs.result === "success") {
              console.log(`アップロードに成功しました。`)
            } else {
              Storage.remove(imageKey)
              console.log(`アップロードに失敗しました。`)
            }
          }
        })
        return () => {
          Hub.remove("storage", () => {})
        }
      }, [])
    // async function onChange(e) {
    //     const file = e.target.files[0];
    //     // user情報の取得（cognito）
    //     let user1 = await Auth.currentAuthenticatedUser();
    //     let cognitoID = user1.attributes.sub;
    //     setCognitoId(cognitoID);
    //     try {
    //         await Storage.put(`${cognitoID}/ProfileImage/${file.name}`, file, {
    //             contentType: "image/png", // contentType is optional
    //         });
    //     } catch (error) {
    //         console.log("Error uploading file: ", error);
    //     }
    // }

    //   useEffect(() => {
    //     getUserDataAws()
    // }, [])

    return (
        <>
            <AmplifyS3Image imgKey={`${cognitoId}/ProfileImage/2022-02-14_21.12.13.png`} />
            <AmplifyS3ImagePicker trace />;
            {/* <input type="file" onChange={onChange} /> */}
        </>
    );
}
export default Certification