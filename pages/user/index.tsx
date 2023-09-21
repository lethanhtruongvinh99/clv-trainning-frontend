import UserManagement from '@/src/layout/userManagement';
import { GetServerSideProps } from 'next';

interface IProps {
  users: any[]
}

const UserPage = (props: IProps) => {

  // https://stackoverflow.com/questions/68646334/nest-js-google-loginpassport-js-with-spa-frontendreact

  return (
    <div>
      <UserManagement />
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const req = await fetch('http://localhost:3000/users', {

//   });
//   const result = await req.json();
//   return {
//     props: {
//       users: result
//     }
//   }
// }
export default UserPage