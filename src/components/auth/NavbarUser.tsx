import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {APP_ENV} from "../../env";
import {login} from "../store/accounts/accounts.actions.ts";
import {logout} from "../store/accounts/accounts.slice.ts";
import {useNavigate} from "react-router-dom";

export default function NavbarUser() {
    const {isLogin, isAdmin, user} = useAppSelector(state => state.account);
    const baseUrl = APP_ENV.BASE_URL;
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    async function handleLogout() {
        await dispatch(logout());
        navigator("/");
    }

    function handleAdmin() {
        navigator("admin");
    }

    function handleBoard() {
        navigator(`board/${user?.Id}`);
    }

    return (

                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="danger"
                            name="Jason Hughes"
                            size="sm"
                            src={`${baseUrl}/uploads/${user?.ImagePath}`}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{user?.Email}</p>
                        </DropdownItem>
                        <DropdownItem onClick={handleBoard} key="settings">My Board</DropdownItem>
                        <DropdownItem key="team_settings">Friends</DropdownItem>
                        <DropdownItem key="team_settings">Profile Settings</DropdownItem>
                        {isAdmin ?
                            (<DropdownItem onClick={handleAdmin} key="team_settings">Admin Panel</DropdownItem>) : null}
                        <DropdownItem onClick={handleLogout} key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

    );
}
