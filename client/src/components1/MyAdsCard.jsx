import axios from "axios";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import Moment from "react-moment";
import { Link } from "react-router-dom";
export default function WishCard({ item,userCredentials,setUserCredentials }) {

  const condition = item.condition;
var star=[];
for(var i=0;i<5;i++){
  if(i<condition)
  star.push(<FaStar key={i}/>);
  else
  star.push(<FiStar key={i}/>);
}

function handleDelete(){
  const userId = localStorage.getItem('id');
  console.log("HANDLE FAV EXECUTTED");
  console.log(userCredentials)
  axios.post("http://localhost:8000/deletead", {
        productId: item._id,
        userId: userCredentials.id ? userCredentials.id : userId
    }).then((res) => {
      setUserCredentials(prevState=>({...prevState,productId:res.data.productId}))
      window.localStorage.removeItem('productId');
      window.localStorage.setItem('productId',JSON.stringify(res.data.productId));
      console.log("RESPONSE FROM FAVORITE BACKEND" + res.data.productId);
    }).catch((error)=>{console.log(error)});
    alert("Your Ad deleted successfully");
}


  return (
    <div className="w-[70%] h-[18rem] m-auto bg-gray-700 text-white text-xl flex justify-between align-middle my-6">
      <img className="w-[30%] p-1" src={item.img1} alt="book"></img>
      <div className="w-[50%] p-4">
        <div className=" h-[5rem]">
          <h3 className="font-bold text-2xl">{item.bookname}</h3>
          <h3 className="font-bold text-3xl">&#8377; {item.price}</h3>
        </div>
        <div className="flex text-yellow-300 text-[100%] h-[2rem]">
                {star.map((st) => st)}
              </div>
        <div className="h-[7rem]">
          <h4 className="font-bold ">Description</h4>
          <p className="text-md text-gray-400">{item.description}</p>
        </div>
        <div className="flex justify-between align-middle">
          <p>{item.location}</p>
          <p>
            <Moment fromNow>{item.date}</Moment>
          </p>
        </div>
      </div>
      <div className="flex flex-col align-middle w-[20%] h-full border-l border-gray-600">
        <div className="flex justify-center align-middle">
        <button className="text-white bg-blue-500 w-[8rem] hover:text-gray-400 m-4 p-2 rounded text-2xl" onClick={handleDelete}>Delete</button>
        </div>
        <div className="w-full h-[16rem] flex flex-col">
        <Link className="w-full h-[16rem] flex flex-col" to={"/"+item._id}>
        <button className="bg-blue-500 text-2xl m-auto py-2 px-4 rounded hover:text-gray-300">More Details</button>
        </Link>
        </div>
      </div>
    </div>
  );
}