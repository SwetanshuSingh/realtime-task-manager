/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function NewTaskModal({ token, setTasks }) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({title : "", description : ""});

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData('');
  }

  const handleChange = (evt) => {
    setFormData((prev) => {
      return {...prev, [evt.target.name] : evt.target.value}
    })
  }
  
  const handleSubmit = async () => {
    const response = await fetch("/api/tasks/create", {
      method : "POST",
      headers : {
        'token' : token,
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(formData)
    });

    const result = await response.json();
    console.log(result);
    setTasks((prev) => {
      return [...prev, result.data]
    })
    onCloseModal();
  }

  return (
    <>
      <Button className="bg-green-500 bg-opacity-85 shadow-lg font-semibold text-white px-1 rounded-full" onClick={() => setOpenModal(true)}>Add Task</Button>
      <Modal className="font-0" dismissible show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header className="bg-[#212121]" />
        <Modal.Body className="bg-[#212121]">
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-[#DBE1E8]">Create a Task</h3>
            <div>
              <div className="mb-2 block">
                <Label className='text-[#DBE1E8] text-xl' htmlFor="email" value="Title" />
              </div>
              <TextInput
                id="email"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="text-[#DBE1E8] font-0 text-lg" htmlFor="password" value="Description" />
              </div>
              <textarea onChange={handleChange} className="w-full rounded-lg text-sm" name="description" id="description" cols="30" rows="5"></textarea>
            </div>
            <div className="w-full flex justify-center">  
              <Button onClick={handleSubmit} className="bg-green-500 bg-opacity-85 shadow-lg font-semibold text-white rounded-lg font-0">Create Task</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
