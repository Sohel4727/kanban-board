import "./boards.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import mockData from "../../mockData";
import { useState } from "react";
import Card from "../card";

import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Dialog, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
const initialValue = {
  title: "",
  description: "",
  date: "",
  ind: "",
};
const Boards = () => {
  const [data, setData] = useState(mockData);
  const [userInfo, setUserInfo] = useState(initialValue);
  const [dialogBox, setDialogBox] = useState(false);

  const [update, setUpdate] = useState(false);

  const handleDelete = (sectionIndex, taskIndex) => {
    // Create a copy of the data array
    const newData = [...data];

    // Remove the task at the specified sectionIndex and taskIndex
    newData[sectionIndex].tasks.splice(taskIndex, 1);

    // Update the state with the modified data array
    setData(newData);
  };

  const handleAdd = () => {
    // Create a copy of the data array
    const newData = [...data];

    // Find the section where you want to add the task (for example, the first section)
    const sectionIndex = 0; // Change this index as needed

    // Create a new task object using the values from userInfo
    const newTask = {
      id: uuidv4(),
      title: userInfo.title,
      description: userInfo.description,
      date: userInfo.date,
    };

    // Add the new task to the section's tasks array
    newData[sectionIndex].tasks.push(newTask);

    // Update the state with the modified data array
    setData(newData);

    // Reset the userInfo and close the dialog box
    setUserInfo({
      title: "",
      description: "",
      date: "",
    });
    setDialogBox(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEdit = (item, index) => {
    // Find the section index and task index within the section
    let sectionIndex = -1;
    let taskIndex = -1;

    data.forEach((section, sIndex) => {
      const tIndex = section.tasks.findIndex((task) => task.id === item.id);
      if (tIndex !== -1) {
        sectionIndex = sIndex;
        taskIndex = tIndex;
      }
    });

    if (sectionIndex !== -1 && taskIndex !== -1) {
      setUserInfo({ ...item, ind: { sectionIndex, taskIndex } });
      setDialogBox(true);
      setUpdate(true);
    }
  };

  const handleUpdate = () => {
    if (userInfo.ind !== null && userInfo.ind !== undefined) {
      const { sectionIndex, taskIndex } = userInfo.ind;

      const updatedData = [...data];
      updatedData[sectionIndex].tasks[taskIndex] = userInfo;

      setData(updatedData);
      setUpdate(false);
      setDialogBox(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );

    if (sourceColIndex !== destinationColIndex) {
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    }
  };

  // dialog box
  const handleClickClose = () => {
    setDialogBox(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board custom-scroll">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="board__section"
                ref={provided.innerRef}
              >
                <div className="board__section__title">
                  {section.title}
                  {section.title === " 📃 To do" && (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      style={{ textTransform: "none" }}
                      className="add_button"
                      onClick={() => setDialogBox(true)}
                    >
                      {" "}
                      + Add Task
                    </Button>
                  )}
                </div>
                <div className="board__section__content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            setDialogBox={setDialogBox}
                            task={task}
                            index={index}
                            sectionIndex={data.indexOf(section)} // Pass the section index to the Card component
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
      <Dialog open={dialogBox} close={dialogBox}>
        <div className="dialog_container">
          <div className="close_container">
            <CancelIcon className="close_icon" onClick={handleClickClose} />
            <h2>Add Task here </h2>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Title"
              variant="outlined"
              size="small"
              type="text"
              name="title"
              value={userInfo.title}
              onChange={(event) => handleOnChange(event)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Description"
              variant="outlined"
              size="small"
              type="text"
              name="description"
              value={userInfo.description}
              onChange={(event) => handleOnChange(event)}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              name="date"
              value={userInfo.date}
              onChange={(event) => handleOnChange(event)}
            />
            <div className="add_button_container">
              {!update ? (
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  className="add_button"
                  onClick={handleAdd}
                >
                  +ADD
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  className="add_button"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </DragDropContext>
  );
};

export default Boards;
