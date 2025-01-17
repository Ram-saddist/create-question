import React, { useState, useEffect,useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from "../contexts/DashboardContext"; 
import './RotatingCarousel.css';

// import questionImage from '../images/question-mark.webp';
// import call from '../images/call.webp';
// import spiral from '../images/spiral-bg.webp'

//  import sathupatiPreethi from '../images/sathupati_preethi.webp';
//  import sathupatiPreethi1 from '../images/sathupati_preethi_1.webp';
//  import anuRajN from '../images/anu_raj_n.webp';
//  import varuniBr from '../images/varuni_br.webp';
//  import morampudiAnuSri from '../images/morampudu_anu_sri.webp';
//  import kavyaC from '../images/kavya_c.webp';
// import bhargaviGHegde from '../images/bhargavi_g_hegde.webp';
//  import sharathS from '../images/sharath_s.webp';
//  import manuN from '../images/manu_n.webp';
// import tShivani from '../images/t_shivani.webp';
// import suhas from '../images/suhas.webp'
// import manojNaidu from '../images/manoj_naidu_m.webp'

const profiles = [
   { id: 1, package: '18.2 LPA', company: 'Akamai', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849456/sathupati_preethi_mubejj.webp", alt: 'sathupati_preethi' },
   { id: 2, package: '9.5 LPA', company: 'Infosys', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849456/sathupati_preethi_1_xyerqt.webp", alt: 'sathupati_preethi_1' },
   { id: 3, package: '7.3 LPA', company: 'CodeYoung', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849438/anu_raj_n_crqd7w.webp", alt: 'anu_raj_n' },
   { id: 4, package: '7 LPA', company: 'Healthsyst', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849464/varuni_br_ji3lzr.webp", alt: 'varuni-br' },
   { id: 5, package: '7 LPA', company: 'TCS', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849449/morampudu_anu_sri_m0ni5y.webp", alt: 'morampudi_anu_sri' },
   { id: 6, package: '7 LPA', company: 'Healthsyst', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849444/kavya_c_zkvdnm.webp", alt: 'kavya_c' },
   {id:7,package:'6.5 LPA', company:'Mastech',image:"https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849449/manoj_naidu_m_itdtcw.webp",alt:'manoj_naidu'},
   { id: 8, package: '6.5 LPA', company: 'Aptean', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/bhargavi_g_hegde_cvurt4.webp", alt: 'bhargavi_g_hegde' },
   { id: 9, package: '6.5 LPA', company: 'Aptean', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849456/sharath_s_bznwej.webp", alt: 'sharath_s' },
   { id: 10, package: '6.5 LPA', company: 'Aptean', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849449/manu_n_oqizdn.webp", alt: 'manu_n' },
   { id: 11, package: '6.5 LPA', company: 'Aptean', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849457/t_shivani_bkgftb.webp", alt: 't_shivani' },
  { id: 12, package: '6.5 LPA', company: 'Aptean', image: "https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849457/suhas_zrwtlu.webp", alt: 'suhas' }
];


const RotatingCarousel = () => {
  const [angle, setAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { dashboardData } = useDashboard();

  
    const totalStudentsPlaced = useMemo(() => {
      if (!dashboardData) return 0;
      return Object.values(dashboardData.yearOFPlacement || {}).reduce(
        (acc, count) => acc + count,
        0
      );
    }, [dashboardData]);
  

  // Function to calculate translation distance based on screen width
  const getTranslationDistance = () => {
    if (window.innerWidth < 476) return 140;
    if (window.innerWidth < 576) return 180;
    if (window.innerWidth < 796) return 220;
    if (window.innerWidth < 1135) return 250;
    if (window.innerWidth < 1285) return 210;
    if (window.innerWidth < 1580) return 270; // Mobile
    if (window.innerWidth <1850) return 270;
    if (window.innerWidth > 1850) return 300;
    return 200; // Desktops
  };
  const [translationDistance, setTranslationDistance] = useState(getTranslationDistance());

  // Update translation distance on window resize
  useEffect(() => {
    const handleResize = () => setTranslationDistance(getTranslationDistance());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const id = setInterval(() => {
        setAngle((prev) => prev + 30);
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      }, 800);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isHovered]);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearInterval(intervalId); 
  };

  const handleMouseLeave = () => {
    setIsHovered(false); 
  };

  return (
    <div className='main-container'>
      <img
        src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849456/spiral-bg_vvbq62.webp"
        alt="Spiral Background"
        className="spiral-bg"
      />
      <div className="carousel-container">
      
        <div className="carousel">
          {profiles.map((profile, index) => {
            const rotation = angle + (index * (360 / profiles.length));
            return (
              <div
                key={profile.id}
                className={`profile ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `rotate(${rotation}deg) translate(${translationDistance}px) rotate(-${rotation}deg)`,
                  transition: 'transform 0.5s ease',
                }}
              >
                <span className='name'>
                  <span className='package'>{profile.package}</span> <br />
                  {profile.company}
                </span>
                <div className="highlight-circle">
                  <img src={profile.image} alt={profile.alt} className='rotate-img' width="200" 
                  height="200" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="center-profile">
          <div className="highlight-circle">
            <img src={profiles[activeIndex].image} alt={profiles[activeIndex].alt} />
          </div>
          <span className='center-text'>
            <span className='package'>{profiles[activeIndex].package} </span> {profiles[activeIndex].company}
          </span>
        </div>
      </div>
      <div className="right-section-container">
       
        <div className='right-section'>
        <div className='text-next'>
          <div className="text-content">
            <p>
              After <span className="highlight">{totalStudentsPlaced}+</span> <br /> Successful Placed <br /> Students
            </p>
            <h1>WHO IS <br /> NEXT...</h1>
          </div>
          <img src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849454/question-mark_monpn0.webp" alt="Question Mark" className="question-mark" 
           width="300" height="300" />
          </div>
          <div className="callback-section">
            <Link to='/talk-to-career-expert' className='request-callback'>
            <button className="callback-button-rotating">
              <img src="https://res.cloudinary.com/db2bpf0xw/image/upload/v1734849439/call_ea4ffs.webp" alt="call" className='call'  width="50" 
               height="50"/> Request A Callback
            </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RotatingCarousel;
