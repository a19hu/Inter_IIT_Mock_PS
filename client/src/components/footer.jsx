import 'rsuite/dist/rsuite.min.css';
import React from 'react';
import { Footer } from 'rsuite';

const CustomFooter = () => {
    return (
        <Footer style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#e0f2ff', color: '#1a73e8' }}>
            <p>© 2024 InterIIT Blockchain | 
                <a 
                    href="https://github.com/a19hu/Inter_IIT_Mock_PS" 
                    style={{ color: '#1a73e8', textDecoration: 'none', margin: '0 8px' }}
                >
                    Privacy Policy
                </a> | 
                <a 
                    href="https://github.com/Krish2005tech/Inter_IIT_Mock_PS" 
                    style={{ color: '#1a73e8', textDecoration: 'none', margin: '0 8px' }}
                >
                    Terms of Service
                </a>
            </p>
        </Footer>
    );
};

export default CustomFooter;
