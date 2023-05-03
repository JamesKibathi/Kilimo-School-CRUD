import { useEffect, useState } from "react";
import axios from "axios"
function ShowStudents({ students, handleFetch, handleUpdate }) {

    const [items, setItems] = useState([])
    const [james, setJames] = useState(false)
    const [edit, setEdit] = useState({})

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
        setJames(true)
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
            setJames(false)
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
            {james ?
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
                        <input type="submit" value="update" />
                    </label>
                </form> : null
            }


        </>
    )
}

export default ShowStudents;