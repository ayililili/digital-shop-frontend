import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.css';

function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -200]);

  return (
    <div className="landing">
      <motion.section style={{ y: y1 }} className="hero">
        <h2>Digital Product Shop</h2>
        <p>Discover our awesome digital goods.</p>
      </motion.section>

      <motion.section style={{ y: y2 }} className="features">
        <h3>Features</h3>
        <p>Easy purchases. Instant downloads.</p>
      </motion.section>
    </div>
  );
}

export default Home;
