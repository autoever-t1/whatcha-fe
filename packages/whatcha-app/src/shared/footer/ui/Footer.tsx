import styles from "./Footer.module.css";
import LogoImg from "@common/assets/logo.png";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles["logo-wrapper"]}>
        <img src={LogoImg} alt="logo" />
      </div>
      <div className={`${styles.copyright} font-r-sm`}>
        COPYRIGHT © T1 WhatCha COMPANY.
        <br />
        ALL RIGHTS RESERVED.
      </div>
      <div className={styles["button-list"]}>
        <button className="font-b-sm">이용약관</button>
        <button className="font-b-sm">개인정보처리방침</button>
        <button className="font-b-sm">오픈소스 라이선스</button>
      </div>
    </div>
  );
}
