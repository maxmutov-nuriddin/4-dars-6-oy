/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form, Input, Modal } from "antd";


import {
  useGetEducationsQuery,
  useGetEducationMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from "../../redux/services/educationServer";

import '../../App.css';
import './education.scss'

const EducationPage = () => {
  const [form] = Form.useForm();

  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10

  const { data, refetch, isLoading } = useGetEducationsQuery(currentPage);

  const [getEducation] = useGetEducationMutation();
  const [addEducation] = useAddEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  useEffect(() => {
    setItemsPerPage(data?.pagination.total)
  }, [data])


  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    form.resetFields()
  };


  const closeModal = () => {
    setShowForm(false);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addEducation(values);
      } else {
        await updateEducation({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  async function editEducation(id) {
    try {
      setSelected(id);
      const { data } = await getEducation(id);
      form.setFieldsValue(data);
      setShowForm(true)
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteEducations(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deleteEducation(id);
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
    <section className="portfolio">
      <div className="container">
        <div className="portfolio__header">
          <h2 className="portfolio__title">Education <span className='portfolio__title-count'>{itemsPerPage}</span></h2>
          <button className="portfolio__button portfolio__button--add" onClick={handleAddClick}>
            Add
          </button>
        </div>
        <div className="portfolio__table-wrapper">
          <table className="portfolio__table">
            <thead>
              <tr>
                <th className="portfolio__table-header">Name</th>
                <th className="portfolio__table-header">Start data</th>
                <th className="portfolio__table-header">End data</th>
                <th className="portfolio__table-header portfolio__table-header-speciale">Description</th>
                <th className="portfolio__table-header portfolio__table-header-speciale">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((portfolio) => (
                <tr key={portfolio._id} className="portfolio__row">
                  <td className="portfolio__name">{portfolio.name}</td>
                  <td className="portfolio__datas">
                    {portfolio.startDate?.split('T')[0]}
                  </td>
                  <td className="portfolio__datas">
                    {portfolio.endDate?.split('T')[0]}
                  </td>
                  <td className="portfolio__datas">
                    {portfolio.level}
                  </td>
                  <td className="portfolio__description">{portfolio.description}</td>
                  <td className="portfolio__actions">
                    <button
                      className="portfolio__button portfolio__button--edit"
                      onClick={() => editEducation(portfolio._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="portfolio__button portfolio__button--delete"
                      onClick={() => deleteEducations(portfolio._id)}
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
        title="Education data"
        open={showForm}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save" : "Add"}
      >
        <Form
          form={form}
          name="portfolio"
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
            label="Education name"
            name="name"
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
            label="Education start"
            name="startDate"
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
            label="Education end"
            name="endDate"
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
            label="Education level"
            name="level"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      {totalPages > 1 && (
        <div className="portfolio__pagination">
          <button
            className="portfolio__pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="portfolio__pagination-current">{currentPage}</span>
          <button
            className="portfolio__pagination-button"
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

export default EducationPage;