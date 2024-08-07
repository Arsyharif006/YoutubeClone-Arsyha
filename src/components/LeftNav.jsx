import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNavMenuItem from './LeftNavMenuItem';
import { categories } from './../utils/constants';
import { Context } from './../context/contextApi';

const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu, setMobileMenu } = useContext(Context);
    const navigate = useNavigate();

    const clickhandler = (name, type) => {
        switch (type) {
            case "category":
            case "home":
                setSelectedCategory(name);
                if (mobileMenu) setMobileMenu(false);  // Close the mobile menu when an item is clicked
                navigate("/YoutubeClone-Arsyha/");
                break;
            case "menu":
                return false;
            default:
                break;
        }
    };

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 transition-all ${
                mobileMenu ? "translate-x-0" : "translate-x-[-240px] md:translate-x-0"
            }`}
        >
            <div className='flex px-5 flex-col'>
                {categories.map((item) => {
                    return (
                        <React.Fragment key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickhandler(item.name, item.type);
                                }}
                                className={`${selectedCategory === item.name ? "bg-white/[0.15]" : ""}`}
                            />
                            {item.divider && (
                                <hr className='my-5 border-white/[0.2]' />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className='my-5 border-white/[0.2]' />
                <div className='text-white/[0.5] text-[12px]'>
                     by: Muhammad Arya Ramadhan
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
