import React, { useState } from 'react'
import NavBar from './NavBar'
import axios from 'axios'

const Search = () => {
    const [data, setData] = useState(
        {
            "id": ""
        }
    )
    const [result, changedResult] = useState([])

    const deleteTicket = (id) => {
        let input = { "_id": id }
        axios.post("http://localhost:8088/delete", input).then(
            (response) => {
                console.log(response.data)
                if (response.data.status == "success") {
                    alert("Successfully deleted")
                }
                else {
                    alert("Error in deletion")
                }
            }
        ).catch().finally()

    }
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const readValue = () => {
        axios.post("http://localhost:8088/search", data).then(
            (response) => {
                changedResult(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        ).finally()
    }
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">Enter ID</label>
                                <input type="text" className="form-control" name='id' value={data.id} onChange={inputHandler} />
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-success" onClick={readValue}>Search</button>
                            </div>
                        </div>
                        <div className="row g-3">
                           {result.map(
                            (value,index)=>{
                                return  <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                                <div class="card">
                                    <img src={value.image} class="card-img-top" alt="..."></img>
                                        <div class="card-body">
                                            <h5 class="card-title">{value.id}</h5>
                                            <p class="card-text">{value.name}</p>
                                            <p class="card-text">{value.price}</p>
                                            <button className="btn btn-danger" onClick={()=>{deleteTicket(value._id)}}>Delete</button>
                                        </div>
                                </div>
                            </div>
                            }
                           )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search