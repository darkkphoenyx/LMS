import { TbPhoto } from "react-icons/tb";
import { IoFastFoodSharp } from "react-icons/io5";
import { GiClover } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { FaRunning } from "react-icons/fa";
import { FaSnowman } from "react-icons/fa";
import { FeaturedCategory } from "../intefaces/FeaturedCategories";

export const FeaturedCategoriesCarouselData: FeaturedCategory[] = [
  {
    name: "Arts & Photography",
    Icon: TbPhoto,
    fillColor: "#6B46C1",
    strokeColor: "#FFFFFF",
  },
  {
    name: "Food & Drinks",
    Icon: IoFastFoodSharp,
    fillColor: "#ECC94B",
    strokeColor: "#fff",
  },
  {
    name: "Romance",
    Icon: GiClover,
    fillColor: "#FF0000",
    strokeColor: "#fff",
  },
  {
    name: "Health",
    Icon: FaStethoscope,
    fillColor: "#00FFFF",
    strokeColor: "#fff",
  },
  {
    name: "Biography",
    Icon: IoIosPaper,
    fillColor: "#FC6C85",
    strokeColor: "#fff",
  },
  {
    name: "Sports",
    Icon: FaRunning,
    fillColor: "#ECC94B",
    strokeColor: "#fff",
  },
  {
    name: "Children",
    Icon: FaSnowman,
    fillColor: "#FF0000",
    strokeColor: "#fff",
  },
];
