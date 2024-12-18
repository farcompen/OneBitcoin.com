import { useEffect, useState } from "react";
import image from "./img/user-circle.png";
import { useQuery } from "react-query";

import axios from "axios";

const Comments = () => {
   
    const retrieveComments = async () => {
    const comments = await axios.get(process.env.REACT_APP_COMMENTS_URL);
   return comments.data.comments
  };  
   const {isPending,error,data}=useQuery({
    queryKey:['comments'],
    queryFn:retrieveComments
   })
   if(!data) return <div>no data..</div>
   if(error) return <div>{error.message}</div>
   return (
    <>

    {data.map((dt) => (
          <>
          <div className="my-8 flex max-w-screen-lg rounded-xl border border-gray-100 p-4 text-left text-gray-600 shadow-lg sm:p-8 font-mono">
          <img
              class="mr-5 block lg:h-10 lg:w-10 max-w-full text-left align-middle sm:h-6 sm:w-6 xs:w-4 xs:h-4"
              src={image}
              alt="Profile Picture"
            />

            <div class="w-full text-left">
              <div class="mb-2 flex flex-col justify-between text-gray-600 sm:flex-row lg:text-base sm:text-base md:text-base xs:text-xs">
                <h3 class="font-medium text-black ">{dt.author}</h3>
                <time class="text-xs" datetime="2022-11-13T20:00Z">
                {new Date(dt.date).toDateString()}
                </time>
              </div>
              <p class="lg:text-base sm:text-base md:text-base  xs:text-xs">
               {dt.comment}
              </p>
              <div class="mt-5 flex items-center justify-between text-gray-600">
                {/* <button class="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg">
                  Reply
                </button> */}
                <a
                  title="Likes"
                  href="#"
                  class="group flex cursor-pointer items-center justify-around"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 rounded-full p-1 group-hover:bg-red-200 group-hover:text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                 
                </a>
              </div>
            </div>
            </div>
          </>
        ))}
        
          
      
    </>
  );
};
export default Comments;
