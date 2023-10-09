/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import {
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../redux/services/portfolioService";

import '../../App.css';
import './skills.scss'

const PortfoliosPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState()
  const pageTotal = 10

  const { data, refetch, isLoading } = useGetPortfoliosQuery(currentPage);

  const [getPortfolio] = useGetPortfolioMutation();
  const [addPortfolio] = useAddPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  useEffect(() => {
    setItemsPerPage(data?.pagination.total)
  }, [data])


  const handleAddClick = () => {
    setSelected(null);
    setShowForm(true);
    setName('');
    setDescription('');
    setUrl('');
    setErrors({});
  };

  const close = () => {
    setShowForm(false);
    setErrors({});
  };

  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!description.trim()) {
      formErrors.description = "Percent is required";
    }

    if (!url.trim()) {
      formErrors.url = "Url is required";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = {
        name,
        url,
        description,
      };
      console.log(formData);
      let values = formData;
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addPortfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      refetch();
      setShowForm(false);
      setName('');
      setDescription('');
      setErrors({});
    } catch (err) {
      console.log(err);
    }
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      const { data } = await getPortfolio(id);
      console.log(data);
      setName(data.name);
      setUrl(data.url)
      setDescription(data.description);
      setShowForm(true)
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePortfolios(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await deletePortfolio(id);
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
                <th className="skills__table-header">Url</th>
                <th className="skills__table-header">Description</th>
                <th className="skills__table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data?.map((portfolio) => (
                <tr key={portfolio._id} className="skills__row">
                  <td className="skills__name">{portfolio.name}</td>
                  <td className="skills__name">
                    <a rel="noreferrer" target="_blank" href={portfolio.url}>{portfolio.url}</a>
                  </td>
                  <td className="skills__description">{portfolio.description}</td>
                  <td className="skills__actions">
                    <button
                      className="skills__button skills__button--edit"
                      onClick={() => editPortfolio(portfolio._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="skills__button skills__button--delete"
                      onClick={() => deletePortfolios(portfolio._id)}
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
      {showForm && (
        <div className="form__form-wrapper">
          <form className="form__form" onSubmit={handleFormSubmit}>
            <h3 className="form__form-title">{selected === null ? 'Add Skills' : 'Edit Skills'}</h3>
            <div className="form__form-group">
              <label className="form__form-label" htmlFor="name">Name</label>
              <input
                className="form__form-input"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="form__form-error">{errors.name}</span>}
            </div>
            <div className="form__form-group">
              <label className="form__form-label" htmlFor="name">Url</label>
              <input
                className="form__form-input"
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              {errors.url && <span className="form__form-error">{errors.url}</span>}
            </div>
            <div className="form__form-group">
              <label className="form__form-label" htmlFor="description">Description</label>
              <input
                className="form__form-textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <span className="form__form-error">{errors.description}</span>}
            </div>
            <div className="form__form-buttons">
              <button type="submit" className="form__button form__button--submit">
                Save
              </button>
              <button className="form__button form__button--cancel" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
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

export default PortfoliosPage;


// import { Fragment, useState } from "react";
// import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
// import {
//   useAddPortfolioMutation,
//   useDeletePortfolioMutation,
//   useGetPortfolioMutation,
//   useGetPortfoliosQuery,
//   useUpdatePortfolioMutation,
// } from "../../redux/services/portfolioService";

// const PortfoliosPage = () => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState(null);

//   const { data, isFetching, refetch } = useGetPortfoliosQuery(page);

//   const [getPortfolio] = useGetPortfolioMutation();
//   const [addPortfolio] = useAddPortfolioMutation();
//   const [updatePortfolio] = useUpdatePortfolioMutation();
//   const [deletePortfolio] = useDeletePortfolioMutation();

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Url",
//       dataIndex: "url",
//       key: "url",
//       render: (url) => (
//         <a rel="noreferrer" target="_blank" href={url}>
//           {url}
//         </a>
//       ),
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Action",
//       render: (_, row) => {
//         return (
//           <Space size="middle">
//             <Button type="primary" onClick={() => editPortfolio(row._id)}>
//               Edit
//             </Button>
//             <Button
//               danger
//               type="primary"
//               onClick={async () => {
//                 await deletePortfolio(row._id);
//                 refetch();
//               }}
//             >
//               Delete
//             </Button>
//           </Space>
//         );
//       },
//     },
//   ];

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     try {
//       let values = await form.validateFields();
//       values.photo = "6521485e1b06670014733226";
//       if (selected === null) {
//         await addPortfolio(values);
//       } else {
//         await updatePortfolio({ id: selected, body: values });
//       }
//       closeModal();
//       refetch();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   async function editPortfolio(id) {
//     try {
//       setSelected(id);
//       setIsModalOpen(true);
//       const { data } = await getPortfolio(id);
//       console.log(data);
//       form.setFieldsValue(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <Fragment>
//       <Table
//         bordered
//         loading={isFetching}
//         title={() => (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               backgroundColor: 'transparent'
//             }}
//           >
//             <h1>Portfolios ({data?.pagination.total})</h1>
//             <Button type="primary" onClick={openModal}>
//               Add portfolio
//             </Button>
//           </div>
//         )}
//         columns={columns}
//         dataSource={data?.data}
//         scroll={{ x: 800 }}
//         pagination={false}
//       />
//       <Pagination
//         total={data?.pagination.total}
//         current={page}
//         onChange={(page) => setPage(page)}
//       />
//       <Modal
//         title="Category data"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={closeModal}
//         okText={selected ? "Save portfolio" : "Add portfolio"}
//       >
//         <Form
//           form={form}
//           name="portfolio"
//           labelCol={{
//             span: 24,
//           }}
//           wrapperCol={{
//             span: 24,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           autoComplete="off"
//         >
//           <Form.Item
//             label="Portfolio name"
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill !",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Portfolio url"
//             name="url"
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill!",
//               },
//             ]}
//           >
//             <Input.TextArea />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Fragment>
//   );
// };

// export default PortfoliosPage;
