import React from "react";

export default function Input(props) {
  const { type, className, name, placeholder, onChange} = props;
 
  return (
    <>
      <input
        type={type?type:'text'}
        className={className?className:'input-login'}
        name={name}
        placeholder={placeholder?placeholder:''}
        onChange={(e)=>onChange(e)}
      required></input>
    </>
  );
}
