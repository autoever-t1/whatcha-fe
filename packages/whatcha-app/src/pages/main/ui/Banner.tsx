import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Banner.module.css";
import "./Banner.css";
import Banner1Image from "@assets/banner1.png";
import Banner2Image from "@assets/banner2.png";
import Banner3Image from "@assets/banner3.png";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";

export function Banner() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        pagination={{ type: "fraction" }}
        loop={true}
      >
        <SwiperSlide>
          <div onClick={() => navigate("/event")}>
            <img src={Banner1Image} alt="Banner1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2Image} alt="sample" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner3Image} alt="sample" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
