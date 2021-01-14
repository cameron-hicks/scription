import React from 'react';

const Navbar = () => {
  // useState hook here, or pass down props?

  return (
    <div className="Navbar">
      <ul> Genres
        <li><a href="#">folk</a></li>
        <li><a href="#">pop</a></li>
        <li><a href="#">movie music</a></li>
        <li><a href="#">other</a></li>
      </ul>
      <ul> Artists/Origins
        <li><a href="#">folk</a></li>
        <li><a href="#">LOTR</a></li>
        <li><a href="#">Star Wars</a></li>
        <li><a href="#">Christina Aguilera</a></li>
      </ul>
      <ul> Eras
        <li><a href="#">traditional</a></li>
        <li><a href="#">'80s</a></li>
        <li><a href="#">'90s</a></li>
        <li><a href="#">2010s</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
