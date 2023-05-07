import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import API from "../utils/API";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Navbar from "../components/Navigation";
import { Link } from "react-router-dom";
import Graphs from "../components/Graphs";
import Footer from "../components/Footer";

function AdminView() {
  const [scoreList, setScoreList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [isFilter200, setFilter200] = useState(false);
  const [isFilter500, setFilter500] = useState(false);
  const [message, setMessage] = useState("");
  const [scoreList2, setScoreList2] = useState([]);
  const [scoreList3, setScoreList3] = useState([]);
  const [scoreList4, setScoreList4] = useState([]);
  const [currentScoreList, setCurrentScoreList] = useState([]);
  const [specificUserEmail, setSpecificUserEmail] = useState("");

  const handleUserSelection = (email) => {
    setSpecificUserEmail(email);
  };

  const loadSpecificUserScores = () => {
    setLoading(true);
    setMessage("");
    API.call(
      `scores/specific_user_scores/?email=${specificUserEmail}`,
      (response) => {
        console.log(response);
        setCurrentScoreList(response);
        setLoading(false);
        console.log(response.token)
      },
      (error) => {
        setMessage("Error en el sistema");
        console.log(error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    loadSpecificUserScores();
  }, [specificUserEmail]);

  const onSubmit =()=>{
    if (isFilter === true){
      setFilter(false);
      setLoading(false);
    }
    else{
      setFilter(true);
      setLoading(true);
    }
  }

  const onSubmit2 =()=>{
    if (isFilter200 === true){
      setFilter200(false);
      setLoading(false);
    }
    else{
      setFilter200(true);
      setLoading(true);
    }
  }

  const onSubmit3 =()=>{
    if (isFilter500 === true){
      setFilter500(false);
      setLoading(false);
    }
    else{
      setFilter500(true);
      setLoading(true);
    }
  }

  const loadData = () =>{
      setLoading(true)
      setMessage("")
      API.call(
          "scores/",
          (response)=>{
          console.log(response)
          setScoreList(response)
          setLoading(false)
      },
      (error)=>{
          setMessage("Error en el sistema")
          console.log(error)
          setLoading(false)
      }
      )
  }

  const loadData2 = () =>{
    setLoading(true)
    setMessage("")
    API.call(
        "scores/filter_user_scores/",
        (response)=>{
        console.log(response)
        setScoreList2(response)
        setLoading(false)
    },
    (error)=>{
        setMessage("Error en el sistema")
        console.log(error)
        setLoading(false)
    }
    )
}

const loadData3 = () =>{
  setLoading(true)
  setMessage("")
  API.call(
      "scores/filter_user_scores_200/",
      (response)=>{
      console.log(response)
      setScoreList3(response)
      setLoading(false)
  },
  (error)=>{
      setMessage("Error en el sistema")
      console.log(error)
      setLoading(false)
  }
  )
}

const loadData4 = () =>{
  setLoading(true)
  setMessage("")
  API.call(
    "scores/filter_user_scores_500/",
      (response)=>{
      console.log(response)
      setScoreList4(response)
      setLoading(false)
  },
  (error)=>{
      setMessage("Error en el sistema")
      console.log(error)
      setLoading(false)
  }
  )
}



  useEffect(()=> {
      loadData()
  },[])

  useEffect(()=> {
    loadData2()
  },[])

  useEffect(()=> {
    loadData3()
  },[])

  useEffect(()=> {
    loadData4()
  },[])


  return (
    <div>
      <Navbar className="navbar" />

      <main className="container">
        <section id="dashboard">
          <h2>User Scores</h2>

          <Table
              headers={[
                  { title: "User", key: "user.email" },
                  { title: "Score", key: "score" },
                  { title: "Average Score", key: "user.average_score", render: (average_score) => Math.round(average_score) },
                  { title: "Average Time", key: "user.average_time", render: (average_time) => Math.round(average_time)  },  
                  { title: "Tasks", key: "tasks" },
                  { title: "Times Completed", key: "user.number_of_times_completed" }, 
              ]}data={currentScoreList}/>
        </section>
        <Button type = "primary" onClick={onSubmit}>Menor a 200</Button>
        <Button type = "primary" onClick={onSubmit2}>Menor a 500</Button>
        <Button type = "primary" onClick={onSubmit3}>Mayor a 500</Button>

        <section id="dashboard2">
          <h2>Dashboard Engine Escape</h2>
        
        {isLoading ? 
        <div></div>: 
        <Table headers = {[
          { title: "User", key: "user.email" },
          { title: "Score", key: "score" },
          { title: "Average Score", key: "user.average_score", render: (average_score) => Math.round(average_score) },
          { title: "Average Time", key: "user.average_time", render: (average_time) => Math.round(average_time)  }, 
          { title: "Tasks", key: "tasks" },
          { title: "Times Completed", key: "user.number_of_times_completed" }, 
          {title: "",key: "user.email", render: (email) => {return ( <Link to="#" onClick={(e) => { e.preventDefault(); handleUserSelection(email); }}> Ver puntajes </Link>);},},
        ]}
        data={scoreList}/>}
        
        </section>
          {isFilter? <section> 
            <Table headers = {[  
              { title: "User", key: "user.email" },
              { title: "Score", key: "score" },
              { title: "Average Score", key: "user.average_score", render: (average_score) => Math.round(average_score) },
              { title: "Average Time", key: "user.average_time", render: (average_time) => Math.round(average_time)  }, 
              { title: "Tasks", key: "tasks" },
              { title: "Times Completed", key: "user.number_of_times_completed" }, 
              {title: "",key: "user.email", render: (email) => {return ( <Link to="#" onClick={(e) => { e.preventDefault(); handleUserSelection(email); }}> Ver puntajes </Link>);},},
        ]}
        data={scoreList2}/> </section>: <div></div>}
          { isFilter200? <section> 
            <Table headers = {[
              { title: "User", key: "user.email" },
              { title: "Score", key: "score" },
              { title: "Average Score", key: "user.average_score", render: (average_score) => Math.round(average_score) },
              { title: "Average Time", key: "user.average_time", render: (average_time) => Math.round(average_time)  }, 
              { title: "Tasks", key: "tasks" },
              { title: "Times Completed", key: "user.number_of_times_completed" }, 
              {title: "",key: "user.email", render: (email) => {return ( <Link to="#" onClick={(e) => { e.preventDefault(); handleUserSelection(email); }}> Ver puntajes </Link>);},},
        ]}
        data={scoreList3}/></section>: <div></div>}
          { isFilter500? <section> <Table headers = {[
          { title: "User", key: "user.email" },
          { title: "Score", key: "score" },
          { title: "Average Score", key: "user.average_score", render: (average_score) => Math.round(average_score) },
          { title: "Average Time", key: "user.average_time", render: (average_time) => Math.round(average_time)  }, 
          { title: "Tasks", key: "tasks" },
          { title: "Times Completed", key: "user.number_of_times_completed" }, 
          {title: "",key: "user.email", render: (email) => {return ( <Link to="#" onClick={(e) => { e.preventDefault(); handleUserSelection(email); }}> Ver puntajes </Link>);},},
        ]}
        data={scoreList4}/> </section>:<div></div>}
        {/* <Graphs className="graphs"></Graphs> */}
        <Graphs scores={scoreList} />
      </main>
      <Footer/>
    </div>
  );
}

export default AdminView;
