import React, {useEffect} from "react";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut,AmplifySignIn } from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from "@aws-amplify/ui-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DefaultRoute from './routes/defaultRoute';
import Skyway from './components/page/skyway/Skyway';

Amplify.configure(awsconfig);
 
function App() {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  useEffect(() => {
      onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData);
      });
  }, []);
  
  return authState === AuthState.SignedIn && user ? (
    <BrowserRouter>
      {/* headerとfooterがいらないページはここでルーティング */}
      <Switch>
        <Route path='/skyway/:time/:room' component={Skyway} />
        <Route path="/" component={DefaultRoute} />
      </Switch>

    </BrowserRouter>
  ) : (

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

  );
}
export default (App);










// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { API } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import { listNotes } from './graphql/queries';
// import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';

// const initialFormState = { name: '', description: '' }

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   async function fetchNotes() {
//     const apiData = await API.graphql({ query: listNotes });
//     setNotes(apiData.data.listNotes.items);
//   }

//   async function createNote() {
//     if (!formData.name || !formData.description) return;
//     await API.graphql({ query: createNoteMutation, variables: { input: formData } });
//     setNotes([ ...notes, formData ]);
//     setFormData(initialFormState);
//   }

//   async function deleteNote({ id }) {
//     const newNotesArray = notes.filter(note => note.id !== id);
//     setNotes(newNotesArray);
//     await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
//   }

//   return (
//     <div className="App">
//       <h1>My Notes App</h1>
//       <input
//         onChange={e => setFormData({ ...formData, 'name': e.target.value})}
//         placeholder="Note name"
//         value={formData.name}
//       />
//       <input
//         onChange={e => setFormData({ ...formData, 'description': e.target.value})}
//         placeholder="Note description"
//         value={formData.description}
//       />
//       <button onClick={createNote}>Create Note</button>
//       <div style={{marginBottom: 30}}>
//         {
//           notes.map(note => (
//             <div key={note.id || note.name}>
//               <h2>{note.name}</h2>
//               <p>{note.description}</p>
//               <button onClick={() => deleteNote(note)}>Delete note</button>
//             </div>
//           ))
//         }
//       </div>
//       <AmplifySignOut />
//     </div>
//   );
// }

// export default withAuthenticator(App);






