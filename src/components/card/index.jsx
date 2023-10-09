import { useState } from "react";
import "./card.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Card = ({
  task,
  setDialogBox,
  handleEdit,
  handleDelete,
  index,
  sectionIndex,
}) => {
  const handleEditClick = () => {
    handleEdit(task, index);
    setDialogBox(true);
  };

  const handleDeleteClick = () => {
    // Call the handleDelete function with the section index and task index
    handleDelete(sectionIndex, index);
  };

  return (
    <div className="card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="button_container">
          <p>{task.date}</p>
        <div>
        <EditIcon color="secondary" style={{ cursor: "pointer" }} onClick={handleEditClick} />
        <DeleteIcon color="error" style={{ cursor: "pointer" }} onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};

export default Card;
