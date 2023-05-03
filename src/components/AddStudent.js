import { useEffect, useState } from "react";
import axios from "axios"
function AddStudent({ students, handleUpdate }) {

    const [streams, setStreams] = useState([])
    const [formData, setFormData] = useState({})
    useEffect(() => {
        fetch("http://127.0.0.1:3000/streams")
            .then(res => res.json())
            .then(data =>{ 
                // handleUpdate()
                setStreams(data)})

    }, [])

    // console.log(streams)

    // let streamName=streams.map(stream=>console.log(stream.name))
    // let options = streams.map(stream=><option>{stream.name}</option>)
    //   console.log(options)

    //posting logic
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    function handleFormSubmit(e) {
        e.preventDefault()
        axios.post('http://localhost:3000/students', formData)
            .then(function (response) {
                // console.log(response);
                handleUpdate()
            })
            .catch(function (error) {
                // console.log(error);
            });
        // console.log(formData)


    }




    return (
        <>
            <p>Form to add a student</p>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input onChange={handleChange} type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input onChange={handleChange} type="email" name="email" />
                </label>
                <label>
                    Stream:
                    <select name="stream_id" onChange={handleChange}>
                        {streams.map(stream => <option value={stream.id}>{stream.name}</option>)}
                    </select>

                </label>
                <input type="submit" value="Submit" />

            </form>


        </>
    )


}

export default AddStudent;
