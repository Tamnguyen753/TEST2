const Header = ({ totalIncompleteTasks }) => {
    return <div className="header">
            <h1>My Todo List</h1>
      <p>Total Incomplete Tasks: {totalIncompleteTasks}</p>

    </div>;
  };
  
  export default Header;
  