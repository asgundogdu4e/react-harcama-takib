import React, { useEffect } from 'react'
import { getCikislarAction, deleteCikisAction, changeIsShowDetailFormAction, setSelectedCikisAction } from '../../store/actions/cikislarActions';
import { getHarcamaTurleriAction } from '../../store/actions/harcamaTurleriActions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Popconfirm, Space, Table } from 'antd';
import { formatDate } from './../../assets/js/date';
import Cikis from './Cikis';
const CikislarList = () => {
    const dispatch = useDispatch();
    const harcamaTurleriList = useSelector(state => state.harcamaTurleri.harcamaTurleriList);
    const cikislarList = useSelector(state => state.cikislar.cikislarList);
    const isShowDetailForm = useSelector(state => state.cikislar.isShowDetailForm);

    useEffect(() => {
        dispatch(getHarcamaTurleriAction());
        dispatch(getCikislarAction());
    }, []);

    const showDetailForm = (record) => {
        dispatch(setSelectedCikisAction(record));
        dispatch(changeIsShowDetailFormAction(true));
    }
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Harcama Tarihi',
            dataIndex: 'tarih',
            key: 'tarih',
            render: (text) => <span>{formatDate(text)}</span>,
        },
        {
            title: 'Harcama Türü',
            dataIndex: 'tur',
            key: 'tur',
            render: (text, record) => <span>{harcamaTurleriList && harcamaTurleriList.find((ht) => ht.id === record.tur).tur}</span>,
        },
        {
            title: 'Harcama Miktarı',
            dataIndex: 'miktar',
            key: 'miktar',
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
                        onConfirm={() => { dispatch(deleteCikisAction(record.id)); }}
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
            <h1>Harcamalar</h1>
            <Button onClick={() => showDetailForm(undefined)}>Yeni Harcama</Button>
            <Table columns={columns} dataSource={cikislarList} rowKey="id" />

            <Modal title="Harcama Kaydı" open={isShowDetailForm} footer={false}>
                <Cikis />
            </Modal>
        </div>
    )
}

export default CikislarList;