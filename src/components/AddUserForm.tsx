import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/user'; 
import { useNavigate } from 'react-router-dom'; //  redirect after submit

const schema = z.object({
  name: z.string().min(1, 'Name is must  required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be at least 18')
});

type FormData = z.infer<typeof schema>;

function AddUser() {
  const { addUser } = useUserContext(); 
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    const newUser: User = {
      id: Math.floor(Math.random() * 10000),
      ...data,
      username: '',
      phone: '',
      website: '',
      address: {
        street: '',
        city: ''
      }
    };

    addUser(newUser); 
    reset(); 
    navigate('/'); // Redirect to HomePage
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='mb-9 font-extrabold'>Add New User</h2>
      <form  className=" text-left border border-black max-w-[940px] w-full grid grid-cols-1 gap-3 p-6 rounded-lg shadow-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>Name:</label>
        <input className='border border-black rounded-xl p-4 font-semibold shadow-lg' {...register('name')} placeholder="Enter Your Name" />
        <p>{errors.name?.message}</p>

        <label>Email:</label>
        <input className='border border-black  rounded-xl p-4 font-semibold shadow-lg' {...register('email')} placeholder="Enter Your Email" />
        <p>{errors.email?.message}</p>

        <label>Age:</label>
        <input className='border border-black rounded-xl p-4 font-semibold shadow-lg' type="number" {...register('age', { valueAsNumber: true })} placeholder="Enter Your Age" />
        <p>{errors.age?.message}</p>

        <button className='py-6 px-4 bg-blue-600 rounded-2xl font-bold shadow-lg max-w-[240px] w-full m-auto hover:bg-blue-700 text-white transition duration-300' type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
