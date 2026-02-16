import React from "react";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center py-4">
            <div className="container">
                <p className="mb-2">
                    &copy; {new Date().getFullYear()} Cipher Toolkit. All rights reserved.
                </p>
                <p>
                    Built with ❤️ by <strong>Jenit Lal Shakya</strong>
                </p>
                <div className="footer-links">
                    <a href="https://github.com/jenitlalshakya" className="github-link" aria-label="Visit GitHub profile" rel="noopener noreferrer" target="_blank">
                        <i className="fab fa-github github-icon" aria-hidden="true"></i>
                        <span className="github-text">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
