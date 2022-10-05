const Navbar = ({ onAddPage }) => (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">DrawBlox</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
                <li><a onClick={onAddPage}>Add Page</a></li>
    </ul>
  </div>
</div>
)

export default Navbar