import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";
import ServerErrorPage from "./components/ServerErrorPage";
import MaintenancePage from "./components/MaintenancePage";
import NoInternetPage from "./components/NoInternetPage";
import ComingSoonPage from "./components/CommingSoon";

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
    
    </>
  );
}
