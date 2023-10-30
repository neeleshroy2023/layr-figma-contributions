import Select from "react-select";

const Filter = ({setCurrentPage, selectedUser, setSelectedUser, users}) => {
    return (
        <div className="mb-3">
          <h2 htmlFor="user-filter" className="form-label">
            Filter by user:
          </h2>
          <Select
            id="user-filter"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.value);
              setCurrentPage(1);
            }}
            options={users}
          />
        </div>
    )
}

export default Filter;