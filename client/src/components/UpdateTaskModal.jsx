/* eslint-disable react/prop-types */
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { FilePenLine } from "lucide-react";
import toast from "react-hot-toast"
import { LoaderCircle } from "lucide-react"

export default function UpdateTaskModal({ token, setTasks, title, description, taskId }) {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({title : title, description : description});
  const [isLoading, setIsLoading] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData({title : title, description : description});
  }

  const handleChange = (evt) => {
    setFormData((prev) => {
      return {...prev, [evt.target.name] : evt.target.value}
    })
  }
  
  const handleSubmit = async () => {
    if(formData?.title?.length === 0 || formData.title === undefined){
      toast.error("Title cannot be empty");
      onCloseModal();
      return
    }
    try {
      if(isLoading){
        return
      }
      setIsLoading(true);
      const response = await fetch("/api/tasks/update/edit", {
        method : "POST",
        headers : {
          'token' : token,
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ taskId : taskId, title : formData.title, description : formData.description })
      });
  
      const result = await response.json();
      if(response.status === 200){
        setTasks((prev) => {
          return prev.map((task) => {
            if(task.id === result.data.id){
              return result.data
            } else {
              return task
            }
          })
        })
        setFormData({title : result.data.title, description : result.data.description});
        toast.success(result.message);
      }
      else{
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Internal Server Error")
    } finally {
      setIsLoading(false);
      onCloseModal();
    }    
  }

  return (
    <>
      <FilePenLine onClick={() => setOpenModal(true)} className="cursor-pointer hover:scale-125 transition-transform" />
      <Modal className="font-0" dismissible show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header className="bg-[#212121]" />
        <Modal.Body className="bg-[#212121]">
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-[#DBE1E8]">Edit Task</h3>
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
              <textarea onChange={handleChange} value={formData.description} className="w-full rounded-lg text-sm" name="description" id="description" cols="30" rows="5"></textarea>
            </div>
            <div className="w-full flex justify-center">  
              <Button onClick={handleSubmit} className="bg-green-500 bg-opacity-85 shadow-lg font-semibold text-white rounded-lg font-0">{isLoading ? <LoaderCircle className="animate-spin" /> : "Update Task"}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
