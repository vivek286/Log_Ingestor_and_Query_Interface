"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
// import './sample.json'
// Setting up MongoDB Connection 


// 
const SearchPage = () => {

  const [Logs,setLogs]=useState([]);
  const [formData, setFormData] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    parentResourceId: "",
  });
  const [searchResult, setSearchResult] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };
  
  async function Searchlogshandle(){
    try {
      console.log(formData,"==>form data");
      const response = await axios.post(
        "http://localhost:3000/search",
        formData
      );
      // console.log("data from api starts")
      console.log(response.data,"===>data form api ");

      setLogs(response.data);
        // const text=JSON.stringify(response.data);
        const text=`Total ${response.data.length} Logs Found For This Search`
          Swal.fire('Result', text, 'success');
        
      
    } catch (error) {
      console.error("Error making POST request for search:", error);
    }
  };
  function showLog(index:any){
    const text=JSON.stringify(Logs[index],null,4);
    Swal.fire({
      title: 'Search Result',
      html:`<code>${text}</code>`,
      
      
      focusConfirm: false,
      width:"40%",
      
    });
  }
  return (
    <div className='bg-gray-400  h-screen'>
     
      <div className=" flex justify-center items-center   w-full bg-gray-400 h-full">
    <div className="w-3/4 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Find Log</h1>
        <form >
         
          <div className="grid grid-cols-2 divide-x justify-center items-center">
          <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Level
      </label>
               <input
               id="level"
               name="level"
               onChange={handleChange}
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
           </div>
           <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Message
      </label>
                <input
                id="message"
                name="message"
                onChange={handleChange} 
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Resource ID
      </label>
                <input
                id="resourceId"
                name="resourceId"
                onChange={handleChange}
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Trace ID
      </label>
                <input 
                id="traceId"
                name="traceId"
                onChange={handleChange}
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        
Span ID
      </label>
                <input
                 id="spanId"
                 name="spanId"
                onChange={handleChange}
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Commit
      </label>
                <input
                id="commit"
                name="commit"
                onChange={handleChange}
                className="border py-2 px-3 text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc"required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Parent Resource ID
      </label>
                <input
                 id="parentResourceId"
                 name="parentResourceId"
                onChange={handleChange}
                className="border py-2 px-3 text-black text-black  text-grey-800" type="text"  placeholder="Enter value like error, etc" required/>
            </div>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
      Timestamp
      </label>
                <input 
                id="timestamp"
                name="timestamp"
                onChange={handleChange}
                className="border py-2 px-3 text-grey-800 text-black" type="datetime-local" required/>
            </div>

</div>
            
            
        </form>
        <a
             
             className="inline-block bg-green-500 mr-4 py-2 px-4 border w-full text-center mt-10 border-transparent rounded-md text-base font-medium text-white hover:bg-green-800"
            onClick={()=>Searchlogshandle()}
           >
            Search
           </a>
        
    


        
    </div>
    <br/>
    
    
</div>
<div className="grid grid-cols-4 divide-x justify-center items-center">
    {Logs.map((log,index)=>{
      return(
        <div className=" flex justify-center items-center   w-full bg-gray-400 h-full">
    <div className="w-3/4 bg-white rounded shadow-2xl p-8 m-4">
    <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Result Log {index+1}</h1>
    <a
             
             className="inline-block bg-blue-500 mr-4 py-2 px-4 border w-full text-center mt-2 border-transparent rounded-md text-base font-medium text-white hover:bg-blue-800"
            onClick={()=>showLog(index)}
           >View</a>
      </div>
      </div>
      )
    })}
    </div>












     
    </div>
  );
};

export default SearchPage;
