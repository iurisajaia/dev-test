import { Table } from 'antd';
import useUsersList from './useUsersList';
import { User } from '../../../utils/types';

const UsersList = () => {
  const { users, columns, handleSelectUser } = useUsersList();
      
  return (
    <Table 
      dataSource={users} 
      columns={columns} 
      pagination={{
        pageSize : 4
      }}
      onRow={(record : User) => {
        return {
          onClick: () => handleSelectUser(record.id), 
        };
      }}
    />
  )
}

export default UsersList