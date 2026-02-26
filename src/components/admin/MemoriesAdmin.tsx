import { useState, useEffect } from 'react';
import { Table, Button, Image, Select, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassCircleIcon
} from '@heroicons/react/24/outline'
const TeaPage = ({ onSelectPage }) => {
    const [teaList, setTeaList] = useState([]);
    const [filteredTeaList, setFilteredTeaList] = useState([]);
    const [teaTypes, setTeaTypes] = useState([]);
    const [teaOrigins, setTeaOrigins] = useState([]);
    const [selectedTeaType, setSelectedTeaType] = useState(null);
    const [selectedTeaOrigin, setSelectedTeaOrigin] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [teaToDeleteId, setTeaToDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();



    const showDeleteModal = (teaId) => {
        setTeaToDeleteId(teaId);
        setDeleteModalVisible(true);
    };

    const handleDelete = () => {
        deleteTea(teaToDeleteId);
        setDeleteModalVisible(false);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const deleteTea = async (teaId) => {
        try {
            const response = await fetch(`http://teaeirro.com/api/deleteTea/${teaId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedTeaList = teaList.filter(tea => tea?.["id"] !== teaId);
                setTeaList(updatedTeaList);
                setFilteredTeaList(updatedTeaList);
                console.log(`Tea with ID ${teaId} deleted successfully.`);
            } else {
                console.error(`Failed to delete tea with ID ${teaId}.`);
            }
        } catch (error) {
            console.error('Error deleting tea:', error);
        }
    };

    const handleEdit = teaId => {
        navigate(`/editTea/${teaId}`);
    };

    const handleDetails = teaId => {
        navigate(`/tea/details/${teaId}`);
    };

    const handleAddButton = () => {
        onSelectPage('addTea');
        navigate('/addTea');
    };

    const handleTeaTypeChange = value => {
        setSelectedTeaType(value);
    };

    const handleTeaOriginChange = value => {
        setSelectedTeaOrigin(value);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const handleClearFilter = () => {
        setSelectedTeaType(null);
        setSelectedTeaOrigin(null);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id', // Assuming 'id' is the key for Tea ID in your data
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend', // Set the default sort order to ascend

        },
        {
            title: 'Image',
            dataIndex: 'tea_images',
            key: 'tea_images',
            render: (teaImages) => (
                <Image
                    src={teaImages.length > 0 ? 'http://teaeirro.com/upload/' + teaImages[0].name : ''}
                    alt="Tea"
                    width={50}
                />
            ),
        },
        {
            title: 'Tea Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Type',
            dataIndex: ['tea_type', 'name'],
            key: 'tea_type',
        },
        {
            title: 'Origin',
            dataIndex: ['tea_origin', 'name'],
            key: 'tea_origin',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <span className={'flex'}>
                    <Button className="flex items-center gap-x-1 text-sm " onClick={() => handleEdit(record.id)}><PencilSquareIcon className="h-5 w-5 flex-none text-gray-400"/>Edit</Button>
                    <Button className="flex items-center gap-x-1 text-sm " onClick={() => handleDetails(record.id)} style={{ marginLeft: 8 }}>
                       <MagnifyingGlassCircleIcon className="h-5 w-5 flex-none text-gray-400"/>
                        Details
                    </Button>
                    <Button className="flex items-center gap-x-1 text-sm " onClick={() => showDeleteModal(record.id)} style={{ marginLeft: 8 }}>
                        <TrashIcon className="h-5 w-5 flex-none text-gray-400"/>
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div className={"mt-16"}>
            <div className="mb-4 flex">
                <h1 className="text-2xl font-bold text-gray-800">tea!</h1>
                <Button onClick={handleAddButton} style={{ marginLeft: 16 }}>
                    Add New
                </Button>
            </div>
            <Input
                style={{ width: 200, marginBottom: 16, marginRight: 16 }}
                placeholder="Search by Name"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchTerm}
            />

            <Select
                style={{ width: 200, marginBottom: 16, marginRight: 16 }}
                placeholder="Select Tea Type"
                onChange={handleTeaTypeChange}
                value={selectedTeaType}
            >
                {teaTypes.map(teaType => (
                    <Select.Option key={teaType?.["id"]} value={teaType?.["name"]}>
                        {teaType?.["name"]}
                    </Select.Option>
                ))}
            </Select>

            <Select
                style={{ width: 200, marginBottom: 16 }}
                placeholder="Select Tea Origin"
                onChange={handleTeaOriginChange}
                value={selectedTeaOrigin}
            >
                {teaOrigins.map(teaOrigin => (
                    <Select.Option key={teaOrigin?.["id"]} value={teaOrigin?.["name"]}>
                        {teaOrigin?.["name"]}
                    </Select.Option>
                ))}
            </Select>



            <Button onClick={handleClearFilter} style={{ marginLeft: 16 }}>
                Clear Filters
            </Button>

            <Button onClick={handleClearSearch} style={{ marginLeft: 16 }}>
                Clear Search
            </Button>
            {/*@ts-ignore*/}
            <Table  columns={columns} scroll={{ x: true }} />

            <Modal
                title="Confirm Deletion"
                visible={deleteModalVisible}
                onOk={handleDelete}
                onCancel={handleCancelDelete}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this tea?</p>
            </Modal>
        </div>
    );
};

export default TeaPage;