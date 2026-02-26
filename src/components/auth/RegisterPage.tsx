import {Divider, Input, Link} from "@nextui-org/react";

import {useState} from "react";
import { PlusOutlined } from "@ant-design/icons";
import {APP_ENV} from "../../env";
import { TypeAnimation } from 'react-type-animation';
import {EyeSlashFilledIcon} from "../../iconsNextUI/EyeSlashFilledIcon.tsx";
import {EyeFilledIcon} from "../../iconsNextUI/EyeFilledIcon.tsx";
import {MailIcon} from "../../iconsNextUI/MailIcon.tsx";
import {UserIcon} from "../../iconsNextUI/UserIcon.tsx";
import {useNavigate} from "react-router-dom";
import {Form, Modal, Upload, UploadFile, UploadProps} from "antd";
import {imageConverter} from "../interfaces/imageconvert.ts";
import { Button } from "antd";
import {IRegisterForm} from "../interfaces/auth.ts";
import axios from "axios";
import {useAppDispatch} from "../../hooks/redux";
import {login, register} from "../store/accounts/accounts.actions.ts";
import {accountsSlice} from "../store/accounts/accounts.slice.ts";
export default function RegisterPage() {

    const baseUrl = APP_ENV.BASE_URL;
    const navigator = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [file, setFile] = useState<UploadFile | null>();
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const dispatch = useAppDispatch();

    const handleChange: UploadProps["onChange"] = ({ fileList: newFile }) => {
        const newFileList = newFile.slice(-1);
        setFile(newFileList[0]);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            // If the file doesn't have a URL or preview, set the preview using the originFileObj
            file.preview = URL.createObjectURL(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
    };

    const toggleVisibility = () => setIsVisible(!isVisible);

    function handleCancel() {
        navigator(-1);
    }
    const onFinish = async (values: IRegisterForm) => {
        try {
            console.log(values);
            const file = values.imagePath?.originFileObj;
            const formData = new FormData();
            formData.append("userName", values.username);
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("role", "user");
            formData.append("image", file);
            console.log(formData);
            await axios.post(`${baseUrl}/api/Accounts/Registration`, formData);
            await dispatch(login({ userName: values.username, password: values.password }));

            navigator("/");
        } catch (error) {
            console.error("Registration failed", error);
        }

    };

    return (
        <div className={"bg-pink-100 font-serif min-h-screen"}>
            <div className="isolate mt-16">
                <div
                    className="absolute inset-x-0 top-[-10rem]  -z-10 transform-gpu overflow-hidden blur-3xl"
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

                <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto mt-5 h-20 w-auto rounded-2xl"
                            src="https://i.pinimg.com/564x/2b/ae/97/2bae97a9423b958577274993864aa400.jpg"
                            alt="Your Company"
                        />
                        <div className={"text-center mt-5"}>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'nnnnostalgia',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'register',
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
                        <Form
                            onFinish={onFinish}
                            layout="vertical">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    //username
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"username"}>
                                        <Input type="username"
                                               placeholder="> ur username"
                                               startContent={
                                                   <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                               }
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    //first name
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"firstName"}>
                                        <Input type="firstName" label="> ur first name"/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                    //last name
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"lastName"}>
                                        <Input type="lastName" label="> ur last name"/>
                                    </Form.Item>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    //e-mail
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"email"}>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            startContent={
                                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                            }
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                //avatar
                            </label>
                            <div className={"flex flex-col text-center"}>
                                <Form.Item name={"imagePath"} getValueFromEvent={imageConverter}>
                                    <Upload
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        listType="picture-card"
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                        accept="image/*"
                                    >
                                        {file ? null :
                                            (
                                                <div>
                                                    <PlusOutlined/>
                                                    <div style={{marginTop: 8}}>Upload</div>
                                                </div>)
                                        }
                                    </Upload>
                                </Form.Item>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        //password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Form.Item name={"password"}>

                                        <Input
                                            label="> ur pass"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        //password again
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Form.Item name={"confirm"}>
                                        <Input
                                            label="> ur pass, again"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <Modal
                                visible={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img alt="example" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                            <div>
                                <Form.Item>

                                    <Button htmlType="submit"
                                            color="default"
                                            className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                    >
                                        Sign up
                                    </Button>
                                </Form.Item>
                                <Button
                                    onClick={handleCancel}
                                    color="default"
                                    className="mt-5 h-10 items-center flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>

                    </div>
                </div>


            </div>

        </div>

    )
}
