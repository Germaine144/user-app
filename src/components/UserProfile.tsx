import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/user";

function UserProfile (){
  const {id} = useParams ();
  const [user ,setUser] = useState <User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchUser (){
      try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok)
        throw new Error ("User Not found");
        const data = await response.json();
        setUser(data);
      }
      catch{
        setError(true);
      }
      finally {
          setLoading(false);
      }
    }
    fetchUser();
  },[id]);
  
  if(loading)
    return <p>Loading ...</p>;

   if(error || !user)
    return <p>User Credential Not Found ....</p>
  return (
    <div className="flex justify-center mt-20">
    <div  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 pt-9 transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500
     hover:text-white cursor-pointer max-w-[540px] w-full ">
      <h2 className="text-3xl font-bold mb-6 ">{user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>City:</strong> {user.address.city}</p>
    </div>
    </div>
  )
}
export default UserProfile ;
