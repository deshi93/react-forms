import React from 'react';
import { useForm } from "react-hook-form";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}


function App() {
  const { register, handleSubmit, control, watch } = useForm<IFormInput>();

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log(data)
    })}>
      <input name="firstName" ref={register({ required: 'some text error', maxLength: 20 })} />
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      <input name="age" type="number" ref={register({ validate: (num) => num > 10 ? 'error mess' : true })} />

      <input type="submit" />
    </form>
  );
}

export default App;
