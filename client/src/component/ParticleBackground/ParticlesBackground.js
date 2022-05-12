import Particles from 'react-tsparticles';
import particlesConfig from '../../config/particles-config';
import { loadFull } from "tsparticles";
import './Particle.css'

export const ParticlesBackground = () => {
    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
      };
      const particlesLoaded = (container) => {
        console.log(container);
      };
    return (
        <Particles className="particles"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesConfig}
        />  
    );
}

export default ParticlesBackground;