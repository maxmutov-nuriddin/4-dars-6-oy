/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import request from '../../server/Server';
import { Form, Input, Modal } from "antd";


import '../../App.css';
import './skills.scss'

const SkillsPage = () => {
  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10


  useEffect(() => {
    getData();
  }, [currentPage]);


  async function getData() {
    try {
      setIsLoading(true)
      let {
        data
      } = await request.get(`skills?page=${currentPage}&limit=${pageTotal}`);
      setItemsPerPage(data.pagination.total)
      setData(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  console.log(data);

  const edit = async (id) => {
    setSelected(id);
    try {
      setShowForm(true);
      let { data } = await request.get(`skills/${id}`);
      setIsLoading(false);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };


  const deleteCategory = async (id) => {
    console.log(id);
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        setIsLoading(true)
        await request.delete(`skills/${id}`);
        getData();
      } catch (err) {
        console.log(err);
      }
    }
  };



  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      
      setIsLoading(true)
      let formData = await form.validateFields();
      console.log(formData);
      if (selected === null) {
        await request.post("skills", formData);
        setIsLoading(false);
      } else {
        console.log(selected);
        await request.put(`skills/${selected}`, formData);
        setIsLoading(false);
      }
      getData();
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

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
    <section className="skills">
      <div className="container">
        <div className="skills__header">
          <h2 className="skills__title">Skills <span className='skills__title-count'>{itemsPerPage}</span></h2>
          <button className="skills__button skills__button--add" onClick={handleAddClick}>
            Add
          </button>
        </div>
        <div className="skills__table-wrapper">
          <table className="skills__table">
            <thead>
              <tr>
                <th className="skills__table-header">Name</th>
                <th className="skills__table-header">Percent</th>
                <th className="skills__table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((category) => (
                <tr key={category._id} className="skills__row">
                  <td className="skills__name">{category.name}</td>
                  <td className="skills__description">{category.percent}</td>
                  <td className="skills__actions">
                    <button
                      className="skills__button skills__button--edit"
                      onClick={() => edit(category._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="skills__button skills__button--delete"
                      onClick={() => deleteCategory(category._id)}
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
        title="Category data"
        open={showForm}
        onOk={handleFormSubmit}
        onCancel={closeModal}
        okText={selected ? "Save skill" : "Add skill"}
      >
        <Form
          form={form}
          name="skill"
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
            label="Skill name"
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
            label="Percent"
            name="percent"
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
        <div className="skills__pagination">
          <button
            className="skills__pagination-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span className="skills__pagination-current">{currentPage}</span>
          <button
            className="skills__pagination-button"
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

export default SkillsPage;
