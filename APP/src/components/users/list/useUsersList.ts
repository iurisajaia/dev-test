import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../../utils/api";
import { Address, User } from "../../../utils/types";

const useUsersList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 50,
      render: (address: Address) => {
        return `${address?.street} ${address?.suite}, ${address?.city} ${address?.zipcode}`;
      },
    },
  ];

  const handleSelectUser = (userId: number) => {
    navigate(`/posts/${userId}`);
  };

  useEffect(() => {
    api.get("users").then((users) => setUsers(users?.data?.data));
  }, []);

  return {
    users,
    columns,
    handleSelectUser,
  };
};

export default useUsersList;
