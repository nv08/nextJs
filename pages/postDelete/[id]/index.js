/* eslint-disable jsx-a11y/alt-text */
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";


export default function Index() {
  const location = useRouter();
  const { id } = location.query;
  const cookie = Cookies.get('token')

  useEffect(()=>{
 async function deletePost(){
    const res = await fetch(`http://localhost:4000/api/posts/delete/${id}`,{
        method : 'DELETE',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${cookie}`,
          }
    })
    
    if(res.status===200){
        toast.success('successful!!',{
            position:'top-center'
        })
      location.push({ pathname: '/home' });
    }
    else{
        toast.error('something went wrong!',{
            position:'top-center'
        })
      location.push({ pathname: `http://localhost:3000/post/${id}`});
    }


}
deletePost()
  })
  return null
}
