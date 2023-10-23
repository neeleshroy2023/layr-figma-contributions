import Select from "react-select";

const Filter = ({setCurrentPage, selectedUser, setSelectedUser, users}) => {
    return (
        <div className="mb-3">
          <label htmlFor="user-filter" className="form-label">
            Filter by user:
          </label>
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