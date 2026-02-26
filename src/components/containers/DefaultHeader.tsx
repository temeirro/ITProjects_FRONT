import {Activity, Lock, ChevronDown, Flash, Scale, Server, TagUser} from "../../iconsNextUI/NavbarIcons.tsx";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Image
} from "@nextui-org/react";
import NavbarUser from "../auth/NavbarUser.tsx";
import {useAppSelector} from "../../hooks/redux";

export default function DefaultHeader(): JSX.Element {
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };

    const {isLogin, isAdmin, user} = useAppSelector(state => state.account);

    return (
        <header className="fixed font-serif w-full top-0 z-50 backdrop-filter backdrop-blur-md bg-opacity-30 bg-white">
            <Navbar>
                <NavbarBrand>
                    <Image width={"50"} src={"/logo.png"}/>
                    <p className="ml-3 font-bold text-inherit">nostalgia</p>
                </NavbarBrand>
                <NavbarContent className="hidden  sm:flex gap-4" justify="center">
                    <Dropdown>
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                    endContent={icons.chevron}
                                    radius="sm"
                                    variant="light"
                                >
                                    Boxes
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="autoscaling"
                                description="ACME scales apps to meet user demand, automagically, based on load."
                                startContent={icons.scale}
                            >
                                [in work]
                            </DropdownItem>
                            <DropdownItem
                                key="usage_metrics"
                                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                                startContent={icons.activity}
                            >
                                [in work]
                            </DropdownItem>
                            <DropdownItem
                                key="production_ready"
                                description="ACME runs on ACME, join us and others serving requests at web scale."
                                startContent={icons.flash}
                            >
                                [in work]
                            </DropdownItem>
                            <DropdownItem
                                key="99_uptime"
                                description="Applications stay on the grid with high availability and high uptime guarantees."
                                startContent={icons.server}
                            >
                                [in work]
                            </DropdownItem>
                            <DropdownItem
                                key="supreme_support"
                                description="Overcome any challenge with a supporting team ready to respond."
                                startContent={icons.user}
                            >
                                [in work]
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavbarItem isActive>
                        <Link href="/" className={"text-pink-300 underline"} aria-current="page">
                            Memories
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Inspiration
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                {isLogin ? (
                    <NavbarContent as="div" justify="end">
                        <NavbarUser/>
                    </NavbarContent>) : (<NavbarContent justify="end">
                    <NavbarItem className="hidden  lg:flex">
                        <Link className={"text-yellow-500"} href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" className={"bg-pink-100 text-yellow-500"} href="register" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>)}

            </Navbar>
        </header>
    );
}


