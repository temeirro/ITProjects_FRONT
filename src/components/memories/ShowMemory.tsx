import {Card, CardFooter, Link, Divider, CardHeader, CardBody, Chip} from "@nextui-org/react";
import {UploadOutlined} from "@ant-design/icons";

import {ChangeEventHandler, useEffect, useState} from "react";

import {TypeAnimation} from 'react-type-animation';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Upload, Select, UploadFile, Image} from "antd";
import {PenIcon} from "../../iconsNextUI/PenIcon.tsx";
import {Textarea} from "@nextui-org/input";
import {IImageItem} from "../interfaces/auth.ts";
import axios from "axios";
import {APP_ENV} from "../../env";
import {useAppSelector} from "../../hooks/redux";

export default function ShowMemory() {
    const {isLogin, isAdmin, user} = useAppSelector((state) => state.account);
    const baseUrl = APP_ENV.BASE_URL;
    const navigator = useNavigate();
    const {Id} = useParams();
    const [post, setPost] = useState<any>({}); // Change the type according to your post structure
    const [form] = Form.useForm();

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/Posts/${Id}`);
            const data = await response.json();
            setPost(data);
            console.log(post);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
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
                    <div className="">
                        <img
                            className="mx-auto h-36 w-auto rounded-xl"
                            src="/viewhead.png"
                            alt="Your Company"
                        />
                        <div className={"text-center mt-5"}>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'nnnnostalgia',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'showing...',
                                    5000
                                ]}
                                speed={30}
                                className="mt-10 text-center text-5xl  leading-9 tracking-tight text-gray-900"
                                repeat={Infinity}
                            />
                        </div>

                        <Divider className="my-4"/>
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{post.shortDescription}</p>

                                <small className="text-default-500">

                                    <div className={"mt-3 flex items-center gap-1"}>
                                        <Chip>Tags</Chip>
                                        {post?.tags?.map((tag) => (
                                            <small className="underline text-default-500">{tag.tag.name}</small>
                                        ))}
                                    </div>
                                </small>
                                <Divider className={"mt-3"}></Divider>

                                <h4 className="font-bold text-large">{post.title}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                            <div className={"flex gap-3 justify-center items-center"}>
                                {post.postImages && post.postImages.map((image) => (
                                    <Image
                                        key={image.id} // Make sure to provide a unique key for each image
                                        alt="Post image"
                                        className="object-cover rounded-xl"
                                        src={`${baseUrl}/uploads/1200_${image.imagePath}`} // Assuming the image URL is stored in the `url` property
                                        width={270}
                                    />
                                ))}

                            </div>
                                <p className={"mt-3"}>{post.description}</p>
                            </CardBody>
                            <CardHeader className={"flex-col items-start"}>
                                <Divider></Divider>

                                <div className={"mt-3 flex items-center gap-1"}>
                                    <Chip className={""}>Category</Chip>
                                    <small className={"underline text-default-500"}>{post?.category?.name}</small>
                                </div>

                            </CardHeader>
                        </Card>
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


                </div>


            </div>


        </div>


    )
}
