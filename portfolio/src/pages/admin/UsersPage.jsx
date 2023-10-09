/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form, Input, Modal } from "antd";


import {
  useGetUsersQuery,
  useGetUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/services/userService";

import '../../App.css';
import './users.scss'

const UsersPage = () => {
  const [form] = Form.useForm();

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10

  const { data, refetch, isLoading } = useGetUsersQuery(currentPage);

  const [getUser] = useGetUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  console.log(data);

  useEffect(() => {
    setItemsPerPage(data?.pagination.total)
  }, [data])


  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
  };


  const closeModal = () => {
    setShowForm(false);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addUser(values);
      } else {
        await updateUser({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  async function editUser(id) {
    try {
      setSelected(id);
      const { data } = await getUser(id);
      console.log(data);
      form.setFieldsValue(data);
      setShowForm(true)
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUsers(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteUser(id);
      refetch();
    }

  }


  if (isLoading) {
    return <div className='loading'>
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>;
    </div>
  }

  const totalPages = Math.ceil(itemsPerPage / pageTotal);


  return (
    <section className="user">
      <div className="container">
        <div className="user__header">
          <h2 className="user__title">User <span className='user__title-count'>{itemsPerPage}</span></h2>
          <button className="user__button user__button--add" onClick={handleAddClick}>
            Add
          </button>
        </div>
        <div className="user__table-wrapper">
          <table className="user__table">
            <thead>
              <tr>
                <th className="portfolio__table-header">FirstName</th>
                <th className="portfolio__table-header portfolio__table-header-speciale">LastName</th>
                <th className="portfolio__table-header">Username</th>
                <th className="portfolio__table-header portfolio__table-header-speciale">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((user) => (
                <tr key={user._id} className="user__row">
                  <td className="user__name">{user.firstName}</td>
                  <td className="user__description">{user.lastName}</td>
                  <td className="user__name">
                    {user.username}
                  </td>
                  <td className="user__actions">
                    <button
                      className="user__button user__button--edit"
                      onClick={() => editUser(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="user__button user__button--delete"
                      onClick={() => deleteUsers(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        className="transparent-modal"
        title="Category data"
        open={showForm}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save" : "Add"}
      >
        <Form
          form={form}
          name="user"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {totalPages > 1 && (
        <div className="user__pagination">
          <button
            className="user__pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="user__pagination-current">{currentPage}</span>
          <button
            className="user__pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default UsersPage;