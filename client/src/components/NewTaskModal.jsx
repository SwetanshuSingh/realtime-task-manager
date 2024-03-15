import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function NewTaskModal() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="text-[#DBE1E8] font-0 text-lg" htmlFor="password" value="Description" />
              </div>
              <textarea className="w-full rounded-lg" name="" id="" cols="30" rows="5"></textarea>
            </div>
            <div className="w-full flex justify-center">  
              <Button className="bg-green-500 bg-opacity-85 shadow-lg font-semibold text-white rounded-lg font-0">Create Task</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
