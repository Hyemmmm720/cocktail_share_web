import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaGlassWhiskey } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isClose } from "../../redux/slices/SideView";

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: white;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: 0.5s ease-in;
  z-index: 2;
  right: ${(props) => (props.isOpen ? 0 : "-25%")};
  width: 25%;
  box-shadow: -3px 0 10px 1px #bebebee8;
  height: 100%;
`;

const SidebarHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseSideBar = styled(MdClose)`
  font-size: 2.5rem;
  color: #657cff;
  height: max-content;
  border-radius: 6px;
  &:hover {
    color: white;
    background-color: #96a5ff;
  }
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
`;

const UserLink = styled(Link)`
  text-decoration-line: none;
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 0.6rem;
  border-radius: 5px;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const LogOutButton = styled.div`
  font-size: 1.2rem;
  border: none;
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const Main = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  line-height: 5rem;
`;

const Items = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 50px;
  &:hover {
    background-color: #eef1ff;
    border-left: 8px solid #657bf8;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 30px;
  text-decoration-line: none;
  color: black;
  &.active {
    color: #4d68ff;
  }
`;

export default function SideBar() {
  const isOpen = useAppSelector((state) => state.sideView.value);
  const dispatch = useAppDispatch();
  return (
    <Container isOpen={isOpen}>
      <SidebarHeader>
        <CloseSideBar onClick={() => dispatch(isClose())} />
        <RightButtons>
          <UserLink to={"/"}>마이페이지</UserLink>
          <LogOutButton>로그아웃</LogOutButton>
        </RightButtons>
      </SidebarHeader>
      <Main>
        <IconContext.Provider value={{ size: "2rem" }}>
          <Items>
            <FaGlassWhiskey />
            <StyledNavLink to={"/"}>도수별 레시피</StyledNavLink>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <StyledNavLink to={"/custom"}>커스텀 레시피</StyledNavLink>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <StyledNavLink to={"/"}>레시피 추천</StyledNavLink>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <StyledNavLink to={"/registration"}>레시피 등록하기</StyledNavLink>
          </Items>
        </IconContext.Provider>
      </Main>
    </Container>
  );
}
