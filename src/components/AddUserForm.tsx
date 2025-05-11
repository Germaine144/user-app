import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/user'; 
import { useNavigate } from 'react-router-dom'; // ✅ redirect after submit

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be at least 18')
});

type FormData = z.infer<typeof schema>;

function AddUser() {
  const { addUser } = useUserContext(); 
  const navigate = useNavigate(); // ✅

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
    navigate('/'); // ✅ Redirect to HomePage
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>Name:</label>
        <input {...register('name')} placeholder="Enter Your Name" />
        <p>{errors.name?.message}</p>

        <label>Email:</label>
        <input {...register('email')} placeholder="Enter Your Email" />
        <p>{errors.email?.message}</p>

        <label>Age:</label>
        <input type="number" {...register('age', { valueAsNumber: true })} placeholder="Enter Your Age" />
        <p>{errors.age?.message}</p>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
