import React, { useEffect } from "react";
import defaultClasses from './modal.module.css';

const Modal = ({ active, setActive, children }) => {
    return (<>
        <div
            className={active ? `${defaultClasses.modal} ${defaultClasses.active}` : defaultClasses.modal}
            onClick={() => setActive(false)}
            onKeyDown={(e)=>console.log(e)}
        >
            <div
                className={active ? `${defaultClasses.modal_content} ${defaultClasses.active}` : defaultClasses.modal_content}
                onClick={(e) => e.stopPropagation()}
            >
                <span 
                    className={defaultClasses.closeModalIcon}
                    onClick={()=>setActive(false)}
                >
                   <h1><b>×</b></h1>
                </span>
                {children}
            </div>
        </div>
        
    </>
    )
}

export default Modal;