import { auth } from '@/auth';

const Home = async () => {
  const session = await auth();

  console.log(session);

  return (
    <>
      <h1 className='text-3xl font-black text-white'>Welcome the Next App</h1>
    </>
  );
};
export default Home;

