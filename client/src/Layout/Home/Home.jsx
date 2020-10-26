import React, {  useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from 'react-spinners';
// Components
import Student from "../../components/Student/Student";
import SearchStudents from "../../components/SearchStudent/SearchStudents";


 const Home=()=>{
   const [state,setState]=useState({
     data:null,
     allStudents:null,
     error:""
   })

   const {data,error}=state;

   useEffect(()=>{
     const getStudents=async()=>{
      try {
        const students = await axios("/api/students/");
        setState({ data: students.data });
      } catch (err) {
        setState({ error: err.message });
      }

     }

     getStudents()
   },[])
  

    const removeStudent = async id => {
    try {
      const studentRemoved = await axios.delete(`/api/students/${id}`);
      const students = await axios("/api/students/");
      setState({ data: students.data });
    } catch (err) {
      setState({ error: err.message });
    }
  };




  const searchStudents = async username => {
    let allStudents = [...data.students];
    if (allStudents === null) setState({ allStudents });

    let students = data.students.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) setState({ data: { students } });

    if (username.trim() === "")
      setState({ data: { students: allStudents } });
  };


  let students;

  if (state.data)
    students =
      data.students &&
      data.students.map(student => (
        <Student key={student._id} {...student} removeStudent={removeStudent} />
      ));
    else return <div className="Spinner-Wrapper"> <PropagateLoader color={'#333'} /> </div>;

  if (error) return <h1>{error}</h1>;
  if (data !== null)
    if (!students.length)
      return <h1 className="No-Students">No students!</h1>;


  return(
    <div className="Table-Wrapper">
    <h1>Students:</h1>
    <SearchStudents searchStudents={searchStudents} />
    <table className="Table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Enrollment Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{students}</tbody>
    </table>
  </div>
    

  )
 }











export default Home;
