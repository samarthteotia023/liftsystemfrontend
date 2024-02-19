"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Lift from "../Lift";


const InputForm = () => {
  const [liftData, setLiftdata] = useState();
  const [updated,setUpdated]=useState();
  const [mintime,setMintime]=useState(0);

  const formik = useFormik({
    initialValues: {
      lift: 0,
    },
    onSubmit,
  });
//function to call updatestate function satus of lift after reaching destination
  function handleupdate(id:number){
    setTimeout(() => {
        handlestate(id)
    }, mintime*2000);
  }

  //function to update state of lift
  async function handlestate(id:number){
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lift/updatestate/${id}`, option)
        .then((res) => res.json())
        .then((data: any) => {
      setUpdated(data)
       
        });
}

//function to handle movement of the lift
  async function handlefloor(floor:number){
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  floor  }),
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lift/move/${floor}`, option)
        .then((res) => res.json())
        .then((data: any) => {
         setUpdated(data)
         setMintime(data.minDistance)
         handleupdate(data?.bestLift?.id)
        });
}

//function for updating maintenance of lift
async function handleChange(values:any) {
    const option = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { values } }),
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lift/maintenance`, option)
        .then((res) => res.json())
        .then((data: any) => {
          setUpdated(data)
        });
  }

  //function to create initiall lifts
  async function onSubmit(values: any) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { ...values } }),
    };
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lift/create`, option)
      .then((res) => res.json())
      .then((data: any) => {
        setLiftdata(data);
      });
  }

  //function to get all the lifts
  async function getlifts() {
    const option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lift/alllifts`, option)
      .then((res) => res.json())
      .then((data: any) => {
        setLiftdata(data);
      });
  } 


  useEffect(()=>{
    getlifts()
  },[updated])
  
  return (
    <div className="w-full"> 
      {/* form to create no. of lifts */}
     {!liftData&& <form
        className="flex  gap-4 justify-center items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col justify-start items-start">
          <label htmlFor="lift">No. Of Lifts</label>
          <input
            type="number"
            name="lift"
            id="lift"
            onChange={formik.handleChange}
          />
        </div>

        <div className="flex flex-col justify-start items-startr">
          <label htmlFor="totalfloor">No. Of Floors</label>
          <input
            type="number"
            name="totalfloor"
            id="totalfloor"
            onChange={formik.handleChange}
          />
        </div>
        <button
          className="py-1 px-2 bg-gray-700 rounded-sm text-white"
          type="submit"
        >
          Submit
        </button>
      </form>}

      <div className="mt-7 flex justify-center items-center">
        <Lift data={liftData} mintime={mintime} handleChange={handleChange} handlefloor={handlefloor} />
      </div>
    </div>
  );
};
export default InputForm;
