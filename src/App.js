
import './App.css';

import ShowStudents from './components/ShowStudents.js'
import AddStudent from './components/AddStudent.js';
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([])
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    fetch("http://127.0.0.1:3000/students")
      .then(res => res.json())
      .then(data => setStudents(data))

  }, [update])

  function handleUpdate() {
    setUpdate(update => !update)
  }

  return (
    <div className="App">
      <h1>Kilimo High School</h1>
      <AddStudent students={students} handleUpdate={handleUpdate} />
      <ShowStudents students={students} handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;
