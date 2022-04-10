import Container from "application/components/common/Container/Container";
import Header from "application/components/common/Header/Header";
import Menu from "application/components/common/Menu/Menu";
import Pooling from "application/components/core/Upload/Pooling";
import UploadOrganization from "application/components/core/Upload/UploadOrganization";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RequestUsers } from "servises/repository/Axios/Request";

const Upload: NextPage = () => {
  /*
  const router = useRouter()
  const check = async () => {
    try {
      const user = await RequestUsers.check()
      return user.data
    } catch (error) {
      router.push('/auth')
    }
  }
  useEffect(() => {
    check()
  }, [])
  */
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <Container>
        <Pooling />
        <UploadOrganization />
        
      </Container>
    </div>
  );
};
export default Upload;
