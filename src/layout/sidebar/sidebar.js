import { useEffect, useRef } from "react";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null);

    // Đóng sidebar khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                toggleSidebar(); // Đóng sidebar nếu click bên ngoài
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleSidebar]);

    return (
        <>
            {/* Overlay nền khi sidebar mở */}
            {isOpen && <div className={cx("backdrop")} onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <nav ref={sidebarRef} className={cx("sidebar", { active: isOpen })}>
                <div className={cx("close-btn")} onClick={toggleSidebar}>&times;</div>
                <ul>
                    <div className={cx("sidebar-top")}>
                        <li><a href="/#" className={cx('infor')}>Tổng quan</a></li>
                        <li><a href="/#" className={cx('sale-infor')}>Khuyến mãi</a></li>
                    </div>

                    <div className={cx("sidebar-middle")}>
                        <li><a href="/#" className={cx('rank')}>Bạn là thành viên....</a></li>
                        <li><a href="/#">Hồ sơ</a></li>
                        <li><a href="/#">Thẻ của tôi</a></li>
                        <li><a href="/#">Danh sách giao dịch</a></li>
                        <li><a href="/#">Khuyến mãi của tôi</a></li>
                    </div>

                    <div className={cx("sidebar-bottom")}>
                        <li><a href="/#">Trợ giúp</a></li>
                        <li><a href="/#">Gửi ý kiến phản hồi</a></li>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
