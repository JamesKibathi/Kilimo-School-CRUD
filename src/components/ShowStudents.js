import { useEffect, useState } from "react";
import axios from "axios"
function ShowStudents({ students, handleFetch, handleUpdate }) {

    const[items,setItems]=useState([])


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
                        <td><button onClick={()=>handleDelete(student.id)}>Delete</button></td>
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
        </>
    )
}

export default ShowStudents;