import React, { useEffect, useState} from "react";
import Navbar from "../components/Navigation";
import Graphs from "../components/Graphs";
import Table from "../components/Table";
import API from "../utils/API";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Footer from "../components/Footer";

function HomeView () {

    const[profileList, setProfileList] = useState([])
    const[isLoading, setLoading] = useState(false)
    const[message, setMessage] = useState("")

    const loadData = () =>{
        setLoading(true)
        setMessage("")
        API.call(
            "profile/current_profile/",
            (response)=>{
            console.log(response)
            setProfileList(response)
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

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login"
      }


    return (<div>
        
        <Navbar className="navbar" />

        
     
        <main className="container">
        
            <section id="about">
                <h2>About Us</h2>
                <p>Our team is made up of individuals with diverse backgrounds and skillsets, united by a shared passion for technology and a commitment to excellence. We have put our heads together to create an exciting simulator for Regal Rednox: an escape room. This simulator provides a realistic and engaging environment in which employees can practice identifying and responding to potential hazards.</p>
                <p>We take pride in our work and are committed to delivering a high-quality product that meets the unique needs of our clients. We understand the importance of safety in the workplace, and we are excited to be part of a project that has the potential to make a real difference in the lives of Regal Rednox employees.</p>
                <p>Thank you for taking the time to visit our website and learn more about our team and our project. If you have any questions or would like to learn more about our work, please don't hesitate to get in touch. We look forward to hearing from you!</p>
            </section> 
 
            <section>
                <h2>Our Product</h2>
                <p>Our product is a training simulator for Regal Rednox that consists of a Unity game: an escape room simulator. These games connect to an SQL database, which is reflected in our web application. The web application is built using HTML, CSS, React, and Django for the backend, and we have our own Django REST API for communication. The simulator provides employees with a realistic and engaging environment in which to practice identifying and responding to potential hazards in the workplace, ultimately helping to make their jobs safer and more efficient.</p>
            </section>


      </main>
      <Footer/>
      </div>
    );

  };

export default HomeView