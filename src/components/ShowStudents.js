import { useEffect, useState } from "react";
import axios from "axios"
function ShowStudents({ students, handleFetch, handleUpdate }) {

    // const [items, setItems] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [edit, setEdit] = useState({})
    const [streams, setStreams] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:3000/streams")
            .then(res => res.json())
            .then(data =>{ 
                
                setStreams(data)})

    }, [])

    function handleDelete(id) {

        fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
        })
            .then((result) => {
                result.json();
            })
            .then((resp) => {

                handleUpdate()
            });


    }

    function updateStudent(student) {
        setEditForm(true)
        fetch(`http://localhost:3000/students/${student.id}`)
            .then(res => res.json())
            .then(data => setEdit(data))

    }

function handleChangeEdit(e) {
    let name = e.target.name
    let value = e.target.value
    setEdit({...edit, [name]: value})
}

function handlePatch(e) {
e.preventDefault()
console.log(edit)
 fetch(`http://localhost:3000/students/${edit.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...edit,
                name: edit.name,
                email: edit.email 
              }),
          }).then(res=>res.json())
          .then(data=>{
            setEditForm(false)
            handleUpdate()
            console.log(data)})

}

    return (
        <>
            <table>

                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Stream</th>
                    <th>Action</th>
                </tr>
                <tbody>
                    {students ? students.map(student => <tr>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.stream.name}</td>
                        <td>
                            <button onClick={() => handleDelete(student.id)}>Delete</button>
                            <button onClick={() => updateStudent(student)} >Edit</button>

                        </td>
                    </tr>) : null}
                </tbody>



                {/* <tr>
          <td>James</td>
          <td>james@email</td>
          <td>Form 1A</td>
        </tr>
        <tr>
        <td>Njeru</td>
        <td>nicco@mail.com</td>
        <td>Form 1B</td>
        </tr>
        <tr>
        <td>Thighness</td>
        <td>christy@mail.com</td>
        <td>Form 1C</td>
        </tr> */}
            </table>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {editForm ?
                <form onSubmit={handlePatch}>
                    <label htmlFor="name">
                        Name:
                        <input onChange={handleChangeEdit} value={edit.name} id="name" name="name" />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input onChange={handleChangeEdit}  value={edit.email} id="email" name="email" />
                    </label>
                    <label>
                    Stream:
                    <select name="stream_id" onChange={handleChangeEdit}>
                        {streams.map(stream => <option value={stream.id}>{stream.name}</option>)}
                    </select>

                </label>
                    <label>
                        <input type="submit" value="update" />
                    </label>
                </form> : null
            }


        </>
    )
}

export default ShowStudents;