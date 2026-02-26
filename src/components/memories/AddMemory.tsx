import {Card, CardFooter, Input, Link, Image, Divider,Select, SelectItem} from "@nextui-org/react";
import { UploadOutlined } from "@ant-design/icons";

import {ChangeEventHandler, useEffect, useState} from "react";

import {TypeAnimation} from 'react-type-animation';
import {useNavigate} from "react-router-dom";
import {Button, Form, message, Upload} from "antd";
import {PenIcon} from "../../iconsNextUI/PenIcon.tsx";
import {Textarea} from "@nextui-org/input";
import {IImageItem} from "../interfaces/auth.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useAppSelector} from "../../hooks/redux";

export default function AddMemory() {
    const {isLogin, isAdmin, user} = useAppSelector(state => state.account);
    const baseUrl = APP_ENV.BASE_URL;
    const navigator = useNavigate();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [Images, setImages] = useState<IImageItem[]>([]);

    useEffect(() => {
        // Fetch categories from API
        fetchCategories();
        fetchTags();
    }, []);

    const trimTags = (input) => {
        return input.split(',').map(tag => tag.trim());
    };

    const fetchCategories = async () => {
        try {
            // Fetch categories from your API endpoint
            const response = await fetch(`${baseUrl}/api/Categories`);
            const data = await response.json();
            // Update categories state with fetched data
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchTags = async () => {
        try {
            // Fetch categories from your API endpoint
            const response = await fetch(`${baseUrl}/api/Tags`);
            const data = await response.json();
            // Update categories state with fetched data
            setTags(data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const onFinish = async  (values) => {
        const tagIds = values.tagIds.split(',').map(tagId => parseInt(tagId.trim())).filter(id => !isNaN(id));
        console.log(values);
        console.log(tagIds);
        console.log(user?.Id);
        const formData = new FormData();

        formData.append("Title", values.title);
        formData.append("ShortDescription", values.shortDescription);
        formData.append("Description", values.description);
        formData.append("CategoryId", values.categoryId);
        tagIds.forEach(tagId => {
            formData.append("TagIds", tagId);
        });
        formData.append("UserId", user?.Id);

        values.postImages.forEach(pic =>{
            formData.append("pictures", pic.originFileObj);
        });


            const response = await axios.post(`${baseUrl}/api/Posts/Create`, formData);
            navigator(-1);
    };

    const beforeUpload = (file: File) => {
        const isImage = /^image\/\w+/.test(file.type);
        if (!isImage) {
            message.error('Оберіть файл зображення!');
        }
        const isLt2M = file.size / 1200 / 1200 < 10;
        if (!isLt2M) {
            message.error('Розмір файлу не повинен перевищувать 10MB!');
        }
        console.log("is select", isImage && isLt2M);
        return isImage && isLt2M;
    };





    return (

        <div className={"bg-pink-100 min-h-screen font-serif"}>

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
                                    'writing memory...',
                                    5000
                                ]}
                                speed={30}
                                className="mt-10 text-center text-5xl  leading-9 tracking-tight text-gray-900"
                                repeat={Infinity}
                            />
                        </div>

                        <Divider className="my-4"/>
                        <Form                            initialValues={{ remember: true }}
                                                         encType="multipart/form-data"
                                                  className="space-y-6" onFinish={onFinish}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    title
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"title"}>
                                        <Input type="title"
                                               placeholder="enter title of ur memory"
                                               startContent={
                                                   <PenIcon
                                                       className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                               }
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="shortDescription" className="block text-sm font-medium leading-6 text-gray-900">
                                    short description
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"shortDescription"}>
                                        <Input type="shortDescription"
                                               placeholder="enter short description"
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                    description
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"description"}>
                                        <Textarea
                                            label="description"
                                            placeholder="enter full description"

                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label  className="block text-sm font-medium leading-6 text-gray-900">
                                    category
                                </label>
                                <div className="mt-2">
                                    <Form.Item name="categoryId">

                                        <Select
                                        placeholder="select category"
                                    >
                                            {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label  className="block text-sm font-medium leading-6 text-gray-900">
                                    tags
                                </label>
                                <div className="mt-2">
                                    <Form.Item name="tagIds">
                                        <Select
                                            placeholder="select tags"       selectionMode="multiple"

                                        >
                                            {tags.map(tag => (
                                                <SelectItem key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>


                        <div>
                            <Form.Item
                                label="Images"
                                name="postImages"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e.fileList}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select at least one image!",
                                    },
                                ]}
                            >
                                <Upload name="logo"  accept="image/*" action="/upload.do" listType="picture" beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>


                        </div>

                            <div>
                                <Button htmlType="submit"
                                        color="default"
                                        className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >
                                    Post
                                </Button>
                                <Button
                                    onClick={() => {navigator(-1);}}
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
