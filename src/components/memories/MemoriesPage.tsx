import {
    Button,
    Card,
    CardFooter,
    Input,
    Link,
    Image,
    Divider,
    User,
    Chip,
    Table,
    TableHeader,
    TableColumn, TableBody, TableRow, TableCell, Tabs, Tab, CardBody, CardHeader, Tooltip
} from "@nextui-org/react";
import {APP_ENV} from "../../env";

import {useEffect, useState} from "react";

import { TypeAnimation } from 'react-type-animation';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

export default function MemoriesPage() {
    const {isLogin, isAdmin, user} = useAppSelector(state => state.account);
    const baseUrl = APP_ENV.BASE_URL;
    const [isVisible, setIsVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();
    const toggleVisibility = () => setIsVisible(!isVisible);
    useEffect(() => {
        // Fetch users from your API
        fetch(`${baseUrl}/api/Accounts`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []); // Empty dependency array means this effect will only run once when the component mounts

    function handleUserClick(id) {
        navigator(`board/${id}`);
    }

    return (

        <div className={"bg-pink-100 overflow-hidden min-h-screen font-serif  "}>

            <div className={"flex border-b border-black shadow justify-center  mt-16 h-52 bg-[#EDCACF]"}>
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />
                <img
                    className=" mx-auto"
                    src="/mainpagehead.png"
                    alt="Your Company"
                />

            </div>
            <div className="isolate  mt-5">
                <div className="flex min-h-full flex-1 flex-col justify-center  lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <div className={"text-center"}>
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'nnnnostalgia',
                                    2000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'notes',
                                    1000,
                                    'nexus',
                                    1000,
                                    'narrative',
                                    1000
                                ]}
                                speed={30}
                                className="mt-10 text-center text-5xl  leading-9 tracking-tight text-gray-900"
                                repeat={Infinity}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mt-5 flex items-center gap-5 justify-center"}>

                <Chip>Members</Chip>

                {users.map(user => (

                            <Tooltip content="click to show board">
                                <User
                                    onClick={() => {handleUserClick(user.id)}}
                                    key={user.id} // Ensure each user has a unique key
                                    name={user.userName}
                                    description={user.email}
                                    avatarProps={{
                                        src: `${baseUrl}/uploads/${user.imagePath}`,
                                        // Assuming your user object has an 'avatarUrl' property
                                    }}
                                />
                            </Tooltip>



                ))}
                {/*<User*/}
                {/*    name="Jane Doe"*/}
                {/*    description="Product Designer"*/}
                {/*    avatarProps={{*/}
                {/*        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"*/}
                {/*    }}*/}
                {/*/>*/}
            </div>

            <div className="mt-5 border-t border-b border-black flex  justify-center mb-4">
                <div className="flex-wrap pt-5 justify-center w-1/2 ">
                    <div>
                        {isLogin ? (<Card className="py-4 m-5">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Write ur memory!</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Button onClick={() => {navigator("add")}}
                                        className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >write</Button>
                            </CardBody>
                        </Card>) : (<Card className="py-4 m-5">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Please, sign in before uploading your memories!</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Button isDisabled  onClick={() => {navigator("add")}}
                                        className="flex h-10 items-center w-full justify-center rounded-md bg-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                >write</Button>
                            </CardBody>
                        </Card>)}

                        <Card className="py-4 m-5">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">Why should u start write all ur memories?</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <div className={"flex gap-5"}>
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://i.pinimg.com/564x/c4/d7/b3/c4d7b32db97a7ebb1c5841b63090ed12.jpg"
                                        width={270}
                                    />
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://i.pinimg.com/564x/56/7b/c8/567bc843e37f04867d825edd28b2fb83.jpg"
                                        width={270}
                                    />
                                </div>

                                <p>Writing down memories serves as a powerful tool for self-reflection, personal growth, and preservation of one's life experiences. The act of recording memories not only captures fleeting moments but also solidifies them into tangible artifacts that can be revisited, shared, and cherished for years to come.

                                    Firstly, documenting memories allows individuals to reflect on their past experiences, gaining insights into their own development and understanding of the world. Through writing, one can delve into the emotions, thoughts, and lessons learned from various life events, fostering a deeper understanding of oneself and others. This introspective process can lead to personal growth, as individuals recognize patterns, strengths, and areas for improvement within their own lives.

                                </p>
                            </CardBody>
                        </Card>

                    </div>


                </div>
                <div className="w-1/2 p-5 flex-col border-l border-black  bg-[#EDCACF] justify-center ">
                    <Table aria-label="Angelic Numbers and Interpretations">
                        <TableHeader>
                            <TableColumn>NUMBER</TableColumn>
                            <TableColumn>INTERPRETATION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>111</TableCell>
                                <TableCell>Seeing 111 is a call to actively engage in honest dialogues to share your deepest fears and highest hopes. It's about reinforcing trust, especially through challenges.</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>222</TableCell>
                                <TableCell>When you see 222, it's a reminder to keep the faith and stay focused on your goals. Trust that everything is unfolding as it should and that your patience will be rewarded.</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>333</TableCell>
                                <TableCell>333 encourages you to embrace your creativity and express yourself authentically. It's a sign that your ideas and talents are needed in the world, so don't hold back.</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>444</TableCell>
                                <TableCell>Seeing 444 signifies that you are surrounded by angels who are guiding and supporting you. Trust in their presence and know that you are on the right path.</TableCell>
                            </TableRow>
                            <TableRow key="5">
                                <TableCell>555</TableCell>
                                <TableCell>555 is a message of change and transformation. Embrace the opportunities that come your way and be open to new experiences, as they will lead to growth and expansion.</TableCell>
                            </TableRow>
                            <TableRow key="6">
                                <TableCell>666</TableCell>
                                <TableCell>When you see 666, it's a reminder to maintain balance and harmony in your life. Pay attention to your thoughts and actions, and strive for alignment with your highest good.</TableCell>
                            </TableRow>
                            <TableRow key="7">
                                <TableCell>777</TableCell>
                                <TableCell>777 is a sign of spiritual awakening and enlightenment. Trust in your intuition and inner wisdom, and know that you are on the right path toward fulfillment and purpose.</TableCell>
                            </TableRow>
                            <TableRow key="8">
                                <TableCell>888</TableCell>
                                <TableCell>Seeing 888 signifies abundance and prosperity in all areas of your life. Trust that you are supported by the universe and that your hard work will be rewarded.</TableCell>
                            </TableRow>
                            <TableRow key="9">
                                <TableCell>999</TableCell>
                                <TableCell>999 encourages you to release the past and embrace new beginnings. Let go of what no longer serves you and trust in the universe's plan for your future.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>


                    <div className={"mt-5"}>
                        <div className={"flex-wrap flex gap-5"}>
                            <Image width={"300"} src={"https://i.pinimg.com/564x/f7/f6/a1/f7f6a1d3b657441204b3a2cf7ca48e26.jpg"} />
                            <Image width={"300"} src={"https://i.pinimg.com/564x/2e/71/08/2e7108d8fc1759711bcef93faf7c0ca7.jpg"} />
                            <Image width={"300"} src={"https://i.pinimg.com/736x/75/38/58/753858ccb5f7dd95133e73fbc7956e97.jpg"} />

                        </div>


                    </div>

                </div>
            </div>
        </div>


    )
}
