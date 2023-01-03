import React from 'react';
import Project from "../Project";
import img1 from "../../images/scut.gif";
import img2 from "../../images/dog.gif";
import img3 from "../../images/wing.gif";
import img4 from "../../images/girl.gif";
import img5 from "../../images/castles.gif"


function Portfolio(handlePageChange) {
  

  // Replace links with deployed projects and GitHub repos
  const projects = [
    {
      name: 'Scuttle Buttin',
      description: 'Stevie Ray Vaughan Classic',
      link: "https://www.youtube.com/embed/c_7joxLVw2s",
      repo: "https://guitaralliance.com/guitarmojo/blues-o-matic/scuttle_buttin/stevie_ray_vaughan-scuttle_butt.pdf",
      img: img1
    },
    {
      name: 'Black Dog',
      description: 'Led Zeppelin',
      link: "https://www.youtube.com/embed/jqAxGKZ4jvI",
      repo: "https://youtu.be/jqAxGKZ4jvI",
      img:img2
    },
    {
      name: 'Little Wing',
      description: 'Masterpiece by Hendrix',
      link: "https://www.youtube.com/embed/28daMiqpvpU",
      repo: "https://drive.google.com/file/d/1ce3xupNS2SLQxivG81UVTvDBDyB1BcBX/view?usp=share_link",
      img: img3
    },
    {
      name: 'The Girl From Ipanema',
      description: 'Bossa Nova',
      link: "https://www.youtube.com/embed/ZZdqj3IvrOQ",
      repo: "https://drive.google.com/file/d/1vZAzwdy9--djgntK0AIp9r1gLR9efRd4/view?usp=share_link",
      img: img4
    },
    {
      name: 'Castles Made of Sand',
      description: 'Hendrix at his best',
      link: "https://www.youtube.com/embed/D4OWdlDFngk",
      repo: "https://drive.google.com/file/d/1UwP_WGzk3qcbvhrpnF3J4jQx4D4dOlT9/view?usp=share_link",
      img: img5
    },
    
  ];

  return (
    
    <div>
      <div className="flex-row">
        {projects.map((project, idx) => (
          <Project
            project={project}
            key={"project" + idx}
          />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
