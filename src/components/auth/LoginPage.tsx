import {Card, CardFooter, Input, Link, Image, Divider} from "@nextui-org/react";
import {useState} from "react";
import {TypeAnimation} from 'react-type-animation';
import {EyeSlashFilledIcon} from "../../iconsNextUI/EyeSlashFilledIcon.tsx";
import {EyeFilledIcon} from "../../iconsNextUI/EyeFilledIcon.tsx";
import {UserIcon} from "../../iconsNextUI/UserIcon.tsx";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "antd";
import {ILogin, ILoginResult} from "../interfaces/auth.ts";
import {APP_ENV} from "../../env";
import {useAppDispatch} from "../../hooks/redux";
import {login} from "../store/accounts/accounts.actions.ts";

export default function LoginPage() {
    const baseUrl = APP_ENV.BASE_URL;
    const [isVisible, setIsVisible] = useState(false);
    const navigator = useNavigate();
    const dispatch = useAppDispatch();

    const toggleVisibility = () => setIsVisible(!isVisible);

    function handleTake() {
        navigator("/");
    }

    const onFinish = async (values: ILogin) => {
        try {
            // const resp = await axios.post<ILoginResult>(`${baseUrl}/api/Accounts/Login`, values);

            const response = await dispatch(login(values));
            navigator("/");

        } catch (ex) {
            console.error('Error during login:', ex);
        }
    }

    return (

        <div className={"bg-pink-100 font-serif min-h-screen"}>

            <div className="isolate  px-6 py-24 sm:py-32 lg:px-8">
                <div
                    className="absolute inset-x-0 top-[-10rem]  -z-10 transform-gpu overflow-hidden blur-3xl "
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000000] to-[#B438E1] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>

                <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-20 w-auto rounded-xl"
                            src="https://i.pinimg.com/564x/99/b8/f6/99b8f6812e5d68ef9ae41b82da9a15af.jpg"
                            alt="Your Company"
                        />
                        <div className={"text-center mt-5"}>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'nnnnostalgia',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'login',
                                    5000
                                ]}
                                speed={30}
                                className="mt-10 text-center text-5xl  leading-9 tracking-tight text-gray-900"
                                repeat={Infinity}
                            />
                        </div>

                        <Divider className="my-4"/>

                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Form className="space-y-6" onFinish={onFinish}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    username
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"username"}>
                                        <Input type="username"
                                               placeholder="enter ur username"
                                               startContent={
                                                   <UserIcon
                                                       className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                               }
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#"
                                           className="font-semibold underline text-yellow-500 hover:text-pink-300">
                                            forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <Form.Item name={"password"}>
                                        <Input
                                            label="enter ur pass"
                                            endContent={
                                                <button className="focus:outline-none" type="button"
                                                        onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    ) : (
                                                        <EyeFilledIcon
                                                            className="text-2xl text-default-400 pointer-events-none"/>
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <Button htmlType="submit"
                                        color="default"
                                        className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </Form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            u r don`t own ur memories?{' '}
                            <Button
                                href="register"
                                as={Link}
                                color="warning"
                                showAnchorIcon
                                variant="solid"
                                className={"h-8"}
                            >
                                start now
                            </Button>
                        </p>
                        <Divider className="my-4"/>

                        <div
                            className="text-center  flex justify-center mt-5 transform scale-100 hover:scale-110 transition-transform duration-300">
                            <Card
                                isFooterBlurred
                                radius="lg"
                                className="border-none text-center w-72 "
                            >
                                <Image
                                    alt="Woman listing to music"
                                    className="object-cover"
                                    height={400}
                                    src="https://trello.com/1/cards/65f345f88c7f3935ff51afca/attachments/65f348c2c23aa13401ee717e/previews/65f348c4c23aa13401ee7865/download/nostalgia.png"
                                    width={400}
                                />
                                <CardFooter
                                    className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <p className="text-tiny text-white/80">or u can dive into other`s memories</p>
                                    <Button onClick={handleTake} className="text-tiny text-white bg-black/20"
                                            variant="flat" color="default" radius="lg" size="sm">
                                        take me there
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>


                </div>


            </div>


        </div>


    )
}
