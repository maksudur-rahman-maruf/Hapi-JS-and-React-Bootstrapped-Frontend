import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { Button, Table, Form } from 'react-bootstrap';


function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newPersonFirstName, setNewPersonFirstName] = useState("");
  const [newPersonLastName, setNewPersonLastName] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/people").then((response) => {
      setEmployeeList(response.data);
    })
  });

  const addToList = () => {
    Axios.post("http://localhost:3001/person", {
      firstname: firstname,
      lastname: lastname
    });
  };

  const updatePerson = (id) => {
    Axios.put(`http://localhost:3001/person/${id}`, {
      firstname: newPersonFirstName,
      lastname: newPersonLastName
    });
  };

  const deletePerson = (id) => {
    Axios.delete(`http://localhost:3001/person/${id}`);
  };


  return (
    <div className="App">
      <h1>CRUD App with Hapi and ReactJS</h1>

      <Form className="form2">
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" onChange={(event) => {
            setFirstname(event.target.value);
          }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" onChange={(event) => {
            setLastname(event.target.value);
          }} />
        </Form.Group>

        <Button className="mb-3" variant="primary" onClick={addToList}>Add to List</Button>
      </Form>


      <h1>Employee List</h1>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Delete Button</th>
              <th>Update Form</th>
              <th>Update Button</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((val, key) => {
              return (
                <tr key={key}>
                  <td> {val.firstname} </td>
                  <td> {val.lastname}</td>
                  <td> <button onClick={() => deletePerson(val._id)}> Delete </button> </td>
                  <td> <input
                    type="text"
                    placeholder="First Name..."
                    value={val.firstname}
                    onChange={(event) => {
                      setNewPersonFirstName(event.target.value);
                    }}
                  />  <input
                      type="text"
                      placeholder="Last Name..."
                      value={val.lastname}
                      onChange={(event) => {
                        setNewPersonLastName(event.target.value);
                      }}
                    /> </td>
                    <td> <button onClick={() => updatePerson(val._id)}> Update </button> </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>


    </div>
  );
}

export default App;
