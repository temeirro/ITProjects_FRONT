import {Card, CardFooter, Link, Image, Divider} from "@nextui-org/react";
import {UploadOutlined} from "@ant-design/icons";

import {ChangeEventHandler, useEffect, useState} from "react";

import {TypeAnimation} from 'react-type-animation';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Upload, Select, UploadFile} from "antd";
import {PenIcon} from "../../iconsNextUI/PenIcon.tsx";
import {Textarea} from "@nextui-org/input";
import {IImageItem} from "../interfaces/auth.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useAppSelector} from "../../hooks/redux";

export default function EditMemory() {
    const {isLogin, isAdmin, user} = useAppSelector((state) => state.account);
    const baseUrl = APP_ENV.BASE_URL;
    const navigator = useNavigate();
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState<IImageItem[]>([]);
    const {Id} = useParams();
    const [post, setPost] = useState<any>({}); // Change the type according to your post structure
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
        fetchCategories();
        fetchTags();
    }, []);

    console.log(post);

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/Posts/${Id}`);
            const data = await response.json();
            setPost(data);
            form.setFieldsValue({
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                categoryId: data.categoryId,
                tagIds: data.tags.map((tag: any) => tag.tag.id),
                images: data.postImages.map(image => ({url: 'https://localhost:7101/uploads/' + `320_${image.imagePath}`, name: image.imagePath}))
            });
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/Categories`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/Tags`);
            const data = await response.json();
            setTags(data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };


    const handleFinish = async (values: any) => {
        console.log(values);
        const formData = new FormData();

        formData.append("Title", values.title);
        formData.append("ShortDescription", values.shortDescription);
        formData.append("Description", values.description);
        formData.append("CategoryId", values.categoryId);

        values.tagIds.forEach(tagId => {
            formData.append('TagIds', tagId);
        });


        const response = await axios.put(`${baseUrl}/api/Posts/Edit/${Id}`, formData);
        navigator(-1);
    }

    async function handleDeleteImage(url) {
        console.log(url);
        const formData = new FormData();
        formData.append("imagePath", url); // Assuming the URL contains the image path
        try {
            const response = await axios.delete(`${baseUrl}/api/PostImages/DeleteByImagePath`, { data: formData });
            // Handle success
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    }

    async function handleAddImage(file: UploadFile<any>) {
        console.log(file);
        const formData = new FormData();
        formData.append("postId", Id);
        formData.append("imageFile", file);
        const response = await axios.post(`${baseUrl}/api/PostImages/Create/${Id}`, formData);
        window.location.reload();

    }

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
                                    'editing...',
                                    5000
                                ]}
                                speed={30}
                                className="mt-10 text-center text-5xl  leading-9 tracking-tight text-gray-900"
                                repeat={Infinity}
                            />
                        </div>

                        <Divider className="my-4"/>
                        <Form
                            form={form}
                            initialValues={{remember: true}}
                            encType="multipart/form-data"
                            className="space-y-6"
                            onFinish={handleFinish}
                        >
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    title
                                </label>
                                <div className="mt-2">
                                    <Form.Item name="title">
                                        {post.title ? (
                                            <Input defaultValue={post.title}
                                            />
                                        ) : null}


                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="shortDescription"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    short description
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"shortDescription"}>
                                        {post.shortDescription ? (
                                            <Input isDisabled
                                                   type="shortDescription"
                                                   defaultValue={post.shortDescription}
                                                   placeholder="enter short description"
                                            />
                                        ) : null}
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    description
                                </label>
                                <div className="mt-2">
                                    <Form.Item name={"description"}>
                                        {post.description ? (
                                            <Textarea
                                                label="description"
                                                defaultValue={post.description}
                                                placeholder="enter full description"
                                            />
                                        ) : null}
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    category
                                </label>
                                <div className="mt-2">
                                    <Form.Item name="categoryId">
                                        {post?.categoryId ? (
                                            <Select placeholder="select category" defaultValue={post?.categoryId}>
                                                {categories.map(category => (
                                                    <Select.Option key={category.id}
                                                                   value={category.id}>{category.name}</Select.Option>
                                                ))}
                                            </Select>
                                        ) : null}
                                    </Form.Item>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    tags
                                </label>
                                <div className="mt-2">
                                    <Form.Item name="tagIds">
                                        {post.tags ? (
                                            <Select placeholder="select tags" mode="multiple"
                                                    defaultValue={post.tags.map(tag => tag.tag.id)}>
                                                {tags.map(tag => (
                                                    <Select.Option key={tag.id}
                                                                   value={tag.id}>{tag.name}</Select.Option>
                                                ))}
                                            </Select>
                                        ) : null}
                                    </Form.Item>
                                </div>
                            </div>


                            <div>
                                <Form.Item
                                    label="Images"
                                    name="images"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => e.fileList}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select at least one image!",
                                        },
                                    ]}
                                >
                                    <Upload
                                        name="images"
                                        accept="image/*"
                                        listType="picture"
                                        beforeUpload={() => false} // Return false to prevent file upload in edit mode
                                        onRemove={(file) => {
                                            handleDeleteImage(file?.name);

                                        }}
                                        onChange={({ file }) => {

                                            handleAddImage(file);


                                        }}

                                    >
                                        <Button icon={<UploadOutlined/>}>Click to upload</Button>
                                    </Upload>
                                </Form.Item>


                            </div>

                            <div>
                                <Button htmlType="submit"
                                        color="default"
                                        className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >
                                    Save
                                </Button>
                                <Button
                                    onClick={() => {
                                        navigator(-1);
                                    }}
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
