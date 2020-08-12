import React from "react";

function EmployeeCard({ img, name, phone, email }) {
  return (
    
      <div className="card container col-2">
        <div className="card-body">
          <img src={img} alt={name.first} />
          <div>
            <p>{`${name.title} ${name.first} ${name.last}`}</p>
            <p>{phone}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>

  );
}

export default EmployeeCard;
