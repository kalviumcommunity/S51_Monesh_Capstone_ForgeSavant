import React from "react";
import { useSpring, animated } from "@react-spring/web";
import logo from "../assets/ForgeSavant1.png";
import '../Styles/signup.css';

function Signup(){
    
    const animation = useSpring({
        from: { opacity: 0, transform: 'translateX(20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
        config: { duration: 1000 },
    })
    
    return(
        <animated.div  className='Signup'>
            <animated.div className="left-side">
                <animated.div style={animation}>
                    <img src={logo} alt="logo" className="logo" />
                </animated.div>
            </animated.div>
            <div className="right-side">
                <animated.div className="head">
                    <h3>Hello!</h3>
                    <p className="signup-text">Sign up to get started</p>
                </animated.div>
                <input type="text" placeholder="Full Name"/>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Password"/>
                <button className="register">Register</button>
            </div>
        </animated.div>
    )
}

export default Signup;
