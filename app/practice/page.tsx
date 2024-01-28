"use client";
import { useEffect } from "react";

export default function NextPage() {
  function one(value:any) {
    console.log("In ONE function: ",value)
    two(value)
  }

  function two(other:any) {
    console.log("Second Data",other)
  }

  useEffect(() => {
    const data = "I am data!";
    console.log(data)
    one(data)
  }, []);
const data = "I am data!"



  return <div>
    <One first={data}/>
  </div>;
}


function One({first}:any) {
  return(
    <div>
      <p>One : {first}</p>
      <Two second={first + " Into"}/>
      <Three third={first + "From"} />
    </div>
  )
}

function Two({second}:any) {
    return(
      <div>
        <p>Two : {second}</p>
        <Three third={"Data Changed from"}/>
      </div>
    )
  }

  function Three ({third}: any)
  {

    return(
        <div>
            <p>Three : {third}</p>
            
        </div>
    )
  }