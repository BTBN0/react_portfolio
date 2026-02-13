import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../../public/images/logo.jpg";

export default function LogoMotion() {
    return (
        <Link to="/" className="pointer-events-auto">
            <motion.img
                src={logo}
                alt="Logo"
                className="cursor-target object-contain cursor-pointer 
                w-16 h-10
                sm:w-20 sm:h-12
                lg:w-20 lg:h-16
                "
                initial={{
                    opacity: 0,
                    y: -30,
                    scale: 0.7,
                    rotate: -10,
                    filter: "blur(8px)",
                    position: "fixed",
                    left: "70px",
                    top: "30px",

                }}
                animate={{
                    opacity: 1,
                    y: 5,
                    scale: 2,
                    rotate: 0,
                    filter: "blur(0px)",
                }}
                transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                    scale: 2.8,
                    rotate: 3,
                }}
                whileTap={{
                    scale: 0.95,
                }}
            />
        </Link>
    );
}
