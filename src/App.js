import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './pages/componets/header/Header';
import Notifications from './pages/componets/header/Notifications';
import Settings from './pages/componets/header/Settings';
import SignUp from './pages/componets/SignUp';
import Signin from './pages/componets/SignIn';
import { Grid } from '@material-ui/core';
import TopBar from './pages/componets/TopBar';
import Copyright from './pages/componets/Copyright';
import BasicDetail from './pages/componets/USERS/BasicDetail';
import Confirm from './pages/componets/QUES/CreateQuestion3';
import QuestionList from './pages/componets/QUES/QuestionList';
import Mypage from './pages/componets/USERS/Mypage';
import QuestionPage from './pages/componets/QUES/QuestionPage';
import Skyway from './pages/componets/skyway/Skyway';
import BasicDetailsEdit from './pages/componets/USERS/BasicDetailsEdit';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          {/* 認証関係 */}
          <Route exact path="/" component={Signin} />
          <Route exact path="/componets/SignUp" component={SignUp} />

          {/* ヘッダーナビゲーション関係 */}
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/notifications" component={Notifications} />

          <Route exact path="/Top" component={TopBar} />
          <Route exact path="/myPage" component={Mypage} />
          <Route exact path="/componets/TopBar/QuettionPage" component={QuestionPage} />
          <Route exact path="/componets/TopBar/QuestionList" component={QuestionList} />
          <Route exact path="/componets/TopBar/Mypage" component={Mypage} />
          <Route exact path="/componets/TopBar/Question/Detail" component={BasicDetail} />
          <Route exact path="/componets/TopBar/Question/Detail/Confirm" component={Confirm} />
          <Route exact path="/componets/TopBar/BasicDetailsEdit" component={BasicDetailsEdit} />

          <Route exact path='/skyway' component={Skyway} />
        </Switch>
        <Copyright sx={{ mt: 5 }} />
      </BrowserRouter>

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