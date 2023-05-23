import React, { useEffect } from 'react'
import { getHarcamaTurleriAction, deleteHarcamaTuruAction, changeIsShowDetailFormAction, setSelectedHarcamaTuruAction } from '../../store/actions/harcamaTurleriActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Popconfirm, Space, Table } from 'antd';
import HarcamaTuru from './HarcamaTuru';
const HarcamaTurleriList = () => {
    const dispatch = useDispatch();
    const harcamaTurleriList = useSelector(state => state.harcamaTurleri.harcamaTurleriList);
    const isShowDetailForm = useSelector(state => state.harcamaTurleri.isShowDetailForm);

    useEffect(() => {
        dispatch(getHarcamaTurleriAction());
    }, []);

    const showDetailForm = (record) => {
        dispatch(setSelectedHarcamaTuruAction(record));
        dispatch(changeIsShowDetailFormAction(true));
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tür İsmi',
            dataIndex: 'tur',
            key: 'tur',
        },
        {
            title: 'İşlemler',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDetailForm(record)}>Düzelt</Button>
                    <Popconfirm
                        placement="topRight"
                        title="Sil"
                        description="Kayıt silinsin mi?"
                        onConfirm={() => { dispatch(deleteHarcamaTuruAction(record.id)); }}
                        okText="Sil"
                        cancelText="İptal"
                    >
                        <Button danger>Sil</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div>
            <h1>Harcama Türleri</h1>
            <Button onClick={() => showDetailForm(undefined)}>Yeni Harcama Türü</Button>
            <Table columns={columns} dataSource={harcamaTurleriList} rowKey="id" />

            <Modal title="Harcama Türü Kaydı" open={isShowDetailForm} footer={false}>
                <HarcamaTuru />
            </Modal>
        </div>
    )
}

export default HarcamaTurleriList;