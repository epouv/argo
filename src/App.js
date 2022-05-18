import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { API } from 'aws-amplify';

import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';


const initialFormState = { name: '' }

function App() {

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  return (
    <div className="App">
      <form>
        <input type="text"/>
        <button type='submit'/>
      </form>
    </div>
  );
}

export default App;