import React, { useEffect } from "react";
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';


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
