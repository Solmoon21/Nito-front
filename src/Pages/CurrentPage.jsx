import Header from "../Components/Header/Header"
import ProfileBar from "../Components/ProfileSideBar/ProfileBar"
import Footer from "../Components/Footer/Footer"

import { useState } from "react";

function CurrentPage({currentPage}) {
    const [keyword, setKeyword] = useState('');
    const [sideBarActive, setSideBarActive] = useState(false);
  
    return (
        <>
            <Header keyword={keyword} setKeyword={setKeyword} openProfileMenu={setSideBarActive} />
            <ProfileBar sideBarActive={sideBarActive} setSideBarActive={setSideBarActive}/>
            <div className="current-page">
                {currentPage}
            </div>
            <Footer />
        </>
    )
}

export default CurrentPage