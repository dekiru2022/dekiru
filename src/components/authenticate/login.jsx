import React, { useEffect } from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifySignIn,AmplifyConfirmSignUp } from '@aws-amplify/ui-react';
import { I18n } from "aws-amplify";

//https://blog.denet.co.jp/amplify-cognito-custom-react/
// 以下のような形で日本語と英語を紐づけた辞書を作成する
const dict = {
    ja: {
        "Forgot your password?": "パスワードを忘れた場合",
        "Reset password": "パスワードをリセット",
        "No account?": "アカウントを持っていない場合",
        "Create account": "アカウント作成",
    },
};

// 作成した辞書を渡して反映させる
I18n.putVocabularies(dict);
I18n.setLanguage("ja");

function Login() {

    return (
        <AmplifyAuthenticator>
            <AmplifySignIn
                slot="sign-in"
                headerText="ログイン画面"
                submitButtonText="ログイン"
                formFields={[
                    {
                        type: "username",
                        label: "ログインID *",
                        placeholder: "ユーザ名を入力",
                        required: true,
                    },
                    {
                        type: "password",
                        label: "パスワード *",
                        placeholder: "パスワードを入力",
                        required: true,
                    },
                ]}
            />
            <AmplifySignUp
                slot="sign-up"
                headerText="サインアップ"
                haveAccountText=""
                signInText="サインインに戻る"
                submitButtonText="アカウント作成"
                formFields={[
                    {
                        type: "username",
                        label: "ユーザ名を入力してください",
                        placeholder: "ユーザ名",
                    },
                    {
                        type: "email",
                        label: "メールアドレスを入力してください",
                        placeholder: "メールアドレス",
                    },
                    {
                        type: "password",
                        label: "パスワードを入力してください",
                        placeholder: "パスワード",
                        inputProps: { required: true, autocomplete: "new-password" },
                    },
                    {
                        type: "custom:businessCode",
                        label: "招待コード",
                        placeholder: "招待コード",
                    },
                ]}
            />
            <AmplifyConfirmSignUp headerText="確認コードを入力してください" submitButtonText="送信" slot="confirm-sign-up" />
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>

        </AmplifyAuthenticator>
    )
}

export default Login;
