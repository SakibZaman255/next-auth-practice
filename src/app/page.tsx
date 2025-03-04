import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import ServerErrorPage from "./components/ServerErrorPage";
import MaintenancePage from "./components/MaintenancePage";
import NoInternetPage from "./components/NoInternetPage";
import ComingSoonPage from "./components/CommingSoon";
import LoadingTwo from "./components/LoadingTwo";
import LoadingThree from "./components/LoadingThree";
import LoadingFive from "./components/LoadingFive";
import LoadingFour from "./components/LoadingFour";
import LoadingSix from "./components/LoadingSix";
import GsapForm from "./components/GsapForm";
import ImageSlider from "./components/ImageSlider";
import ModernCarousel from "./components/ModernCaraousal";

export default function Home() {
  return (
    <>
    {/* <AuthForm/> */}
    <Loading/>
    <ErrorPage/>
    <ServerErrorPage/>
    <MaintenancePage/>
    <NoInternetPage/>
    <ComingSoonPage/>
    <LoadingTwo/>
    <LoadingThree/>
    <LoadingFour/>
    <LoadingFive/>
    <LoadingSix/>
    <GsapForm/>
    <ImageSlider/>
    <ModernCarousel/>
    
    </>
  );
}
